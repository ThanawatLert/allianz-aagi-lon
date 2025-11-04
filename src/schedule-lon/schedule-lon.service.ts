import baseConfig from '@/common/config/base.config';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs/promises';
import * as path from 'path';
import dayjs from 'dayjs';
import axios from 'axios';
import xlsx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import * as lonFlex from './flex';

interface IFileData {
  MobileNo: string;
  Value1: string;
  Value2: string;
  Value3: string;
  Value4: string;
  Value5: string;
  Value6: string;
  Value7: string;
  Value8: string;
  Value9: string;
  Value10: string;
  Value11: string;
  Value12: string;
  Value13: string;
  Value14: string;
  Value15: string;
  Value16: string;
  Value17: string;
  Value18: string;
  Value19: string;
  Value20: string;
}

const FOLDER_TEMPLATE_NOT_USE_SMS: string[] = [
  'E_RENEWAL_TH',
  'E_RENEWAL_EN',
];

const FOLDER_TEMPLATE_LIST: string[] = [
  'E_RENEWAL_TH',
  'E_RENEWAL_EN',
];

const TEMPLATE_FLEX = {
  E_RENEWAL_TH: lonFlex.flex_1,
  E_RENEWAL_EN: lonFlex.flex_2,
};

@Injectable()
export class ScheduleLonService {
  private locationPath = baseConfig().location_path;
  private lonApiUrl = baseConfig().lon_api_url;
  private lonApiToken = baseConfig().lon_api_token;
  private pageId = baseConfig().page_id;

  async readDir(filePath: string): Promise<string[]> {
    try {
      // Construct the absolute path (e.g., C:\myfolder\myfile.txt)
      const cleanFilePath = filePath.replace(/^\\+/, '');

      const absolutePath = path.join(this.locationPath, cleanFilePath);

      const data = await fs.readdir(absolutePath);
      return data;
    } catch (error) {
      console.error('Error reading dir:', error.message);
      return [];
      // throw error; // Rethrow the error for handling in your controller
    }
  }

  async readFile(filePath: string): Promise<object[]> {
    try {
      // Construct the absolute path (e.g., C:\myfolder\myfile.txt)
      const cleanFilePath = filePath.replace(/^\\+/, '').replace(/\\/g, '/');

      const absolutePath = path.posix.join(this.locationPath, cleanFilePath);
      // const data = await fs.readFile(absolutePath, 'utf-8'); // Read as UTF-8

      const workbook = xlsx.readFile(absolutePath, {
        codepage: 874,
        raw: true,
      });

      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: object[] = xlsx.utils.sheet_to_json(worksheet);
      return jsonData;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error; // Rethrow the error for handling in your controller
    }
  }

  async readFileBuffer(filePath: string): Promise<Buffer> {
    try {
      const absolutePath = path.join('C:\\', filePath);
      const data = await fs.readFile(absolutePath);
      return data;
    } catch (error) {
      console.error('Error reading file (buffer):', error);
      throw error;
    }
  }

  formatRawFile(fileData: IFileData[], useSms: string) {
    const data = [];
    for (let i = 0; i < fileData.length; i++) {
      const user = fileData[i];
      if (user?.MobileNo) {
        const userTemp = user;
        //let mobile = user.MobileNo.toString();
        let mobile = (user.MobileNo ?? '').toString().replace(/\D/g, '');
        if (mobile.length === 11 && mobile.startsWith('66')) {
          mobile = '0' + mobile.slice(2);
        }

        if (mobile.length === 9) {
          mobile = '0' + mobile;
        }
        const formatData = {
          mobile,
          value1: user['Value1'] || null,
          value2: user['Value2'] || null,
          value3: user['Value3'] || null,
        };
        delete userTemp.MobileNo;
        delete userTemp['Value1'];
        delete userTemp['Value2'];
        delete userTemp['Value3'];
        for (let j = 4; j <= 20; j++) {
          if (user[`Value${j}`]) {
            formatData[`value${j}`] = user[`Value${j}`].trim();
            delete userTemp[`Value${j}`];
          }
        }
        for (const key in userTemp) {
          formatData[key] = userTemp[key].trim();
        }
        formatData['forward_sms'] = useSms || 'y';
        data.push(formatData);
      }
    }
    return data;
  }

  splitBatch(allData) {
    const batchSize: number = 10000;
    const batchList = [];
    for (let i = 0; i < allData.length; i += batchSize) {
      batchList.push(allData.slice(i, i + batchSize));
    }
    return batchList;
  }

  async sendLonByFileData(
    folderName,
    fileName,
    fileData,
    useSms: string,
    categoryName: string,
  ): Promise<[string, object[], object[]]> {
    const trackId: string = uuidv4();
    const successList: object[] = [];
    const failList: object[] = [];
    const fileFormatName: string = `${fileName} ${trackId}`;
    fileData = fileData as IFileData[];
    fileData = this.formatRawFile(fileData, useSms);
    const lon_category_id = fileData?.[0]?.lon_category_id || null;
    const batchList = this.splitBatch(fileData);
    const batchSize = batchList.length;
    console.log('batchSize', batchSize);
    for (let i = 0; i < batchList.length; i++) {
      const batchName = `${fileName} ${trackId} Batch : ${i + 1}`;
      const batchData = batchList[i];
      try {
        if (!TEMPLATE_FLEX[folderName])
          throw new Error(
            `TEMPLATE_FLEX not found folder name : ${folderName}`,
          );
      } catch (error) {
        for (let j = 0; j < batchData.length; j++) {
          const batch = batchData[j];
          batch.error = JSON.stringify(error);
          failList.push(batch);
        }
        continue;
      }
      const body = {
        messages: [
          {
            type: 'flex',
            altText: 'You nave a new message',
            contents: TEMPLATE_FLEX[folderName],
          },
        ],
        phone_number_list: batchData,
        delivery_tag: batchName,
        status: 'sent',
        schedule_timestamp: null,
        lon_category_id: lon_category_id,
        lon_category_name: categoryName,
      };
      // fetch lon api
      const headers = {
        Authorization: `BEARER ${this.lonApiToken}`,
      };
      const apiUrl = `${this.lonApiUrl}/${this.pageId}/public/broadcast`;
      try {
        // console.log(apiUrl, { headers });
        // console.log(JSON.stringify(body));

        await axios.post(apiUrl, body, { headers });
        console.log(`send : ${i + 1}/${batchSize}`);
        successList.push(...batchData);
      } catch (error) {
        const textError = error?.response?.data || error;
        for (let j = 0; j < batchData.length; j++) {
          const batch = batchData[j];
          batch.error = JSON.stringify(textError);
          failList.push(batch);
        }
      }
    }
    return [fileFormatName, successList, failList];
  }

  async writeXlsxFromObjects(data, filePath) {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      await fs.writeFile(filePath, buffer, 'binary');
      console.log(`XLSX written to ${filePath} from object array.`);
    } catch (error) {
      console.error(`Error writing XLSX from object array:`, error);
    }
  }

  @Cron('*/15 9-17 * * *', {
    timeZone: 'Asia/Bangkok',
  })
  async handleSchdule() {
    console.log('Start Schedule');
    try {
      for (let k = 0; k < FOLDER_TEMPLATE_LIST.length; k++) {
        const folder = FOLDER_TEMPLATE_LIST[k];

        const pathFolder = `\\${folder}`;

        const fileNames = await this.readDir(pathFolder);

        const preRunningFileNames = [];

        const useSms = FOLDER_TEMPLATE_NOT_USE_SMS.includes(folder) ? 'N' : 'Y';

        for (let i = 0; i < fileNames.length; i++) {
          const fileName = fileNames[i];
          if (fileName.endsWith('.csv') || fileName.endsWith('.xlsx')) {
            let type = null;
            if (fileName.endsWith('.xlsx')) type = 'xlsx';
            else if (fileName.endsWith('.csv')) type = 'csv';
            if (type) preRunningFileNames.push({ fileName, type });
          }
        }

        for (let i = 0; i < preRunningFileNames.length; i++) {
          const filename = preRunningFileNames[i].fileName;
          const pathFile = `\\${folder}\\${filename}`;
          const data = await this.readFile(pathFile);
          const [writeFileName, successList, failList] =
            await this.sendLonByFileData(
              folder,
              filename,
              data,
              useSms,
              folder,
            );
          const baseInfo = {
            mobile: `filename : ${filename}`,
            value1: `timestamp : ${dayjs().format('DD/MM/YYYY HH:mm')}`,
          };
          // 1. write success file
          if (successList.length) {
            // const absoluteSuccessFilePath = path.join(
            //   this.locationPath,
            //   `\\${folder}\\Result\\Success\\${writeFileName}.xlsx`,
            // );

            const absoluteSuccessFilePath = path.join(
              this.locationPath,
              folder,
              'Result',
              'Success',
              `${writeFileName}.xlsx`,
            );
            // await fs.writeFile(absoluteSuccessFilePath, successList);
            successList.push(baseInfo);
            await this.writeXlsxFromObjects(
              successList,
              absoluteSuccessFilePath,
            );
          }

          // 2. write fail file
          if (failList.length) {
            // const absoluteFailFilePath = path.join(
            //   this.locationPath,
            //   `\\${folder}\\Result\\Fail\\${writeFileName}.xlsx`,
            // );
            const absoluteFailFilePath = path.join(
              this.locationPath,
              folder,
              'Result',
              'Fail',
              `${writeFileName}.xlsx`,
            );
            // await fs.writeFile(absoluteFailFilePath, failList);
            failList.push(baseInfo);
            await this.writeXlsxFromObjects(failList, absoluteFailFilePath);
          }

          // 3. write origin file
          // const absoluteOriginalFilePath = path.join(
          //   this.locationPath,
          //   `\\${folder}\\OriginalFile\\${writeFileName}.xlsx`,
          // );
          const absoluteOriginalFilePath = path.join(
            this.locationPath,
            folder,
            'OriginalFile',
            `${writeFileName}.xlsx`,
          );
          // await fs.writeFile(absoluteOriginalFilePath, data);
          await this.writeXlsxFromObjects(data, absoluteOriginalFilePath);

          // 4. remove source file
          //const absoluteRemoveFilePath = path.join(this.locationPath, pathFile);
          const cleanedPathFile = pathFile
            .replace(/^\\+/, '')
            .replace(/\\/g, '/');
          const absoluteRemoveFilePath = path.posix.join(
            this.locationPath,
            cleanedPathFile,
          );
          await fs.unlink(absoluteRemoveFilePath);
        }
      }
    } catch (error) {
      console.error(error);
      console.log('Catch Schedule');
    }
    console.log('End Schedule');
  }
}
