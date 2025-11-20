export const flex_1 = {
  type: "bubble",
  header: {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "image",
        url: "https://vos.line-scdn.net/lon-msg-dsgn/lon-logo-white.png",
        size: "80%",
        gravity: "center",
        align: "center",
        flex: 2,
      },
      {
        type: "text",
        weight: "regular",
        color: "#ffffffff",
        align: "center",
        size: "14px",
        flex: 20,
        wrap: true,
        gravity: "center",
        position: "relative",
        contents: [
          {
            type: "span",
            text: "OFFICIAL NOTIFICATION",
          },
        ],
      },
      {
        type: "text",
        text: "powered by",
        flex: 7,
        align: "end",
        color: "#ffffffff",
        gravity: "center",
        contents: [
          {
            type: "span",
            text: "powered by",
            style: "italic",
            size: "10px",
            weight: "regular",
          },
        ],
        wrap: true,
        offsetTop: "0.3px",
      },
      {
        type: "text",
        text: "powered by",
        flex: 4,
        align: "center",
        color: "#ffffffff",
        gravity: "center",
        wrap: true,
        contents: [
          {
            type: "span",
            text: " LINE",
            weight: "bold",
            size: "12px",
          },
        ],
      },
    ],
    offsetTop: "none",
    paddingAll: "none",
    paddingTop: "md",
    paddingBottom: "md",
    paddingStart: "lg",
    paddingEnd: "lg",
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "บริการแจ้งเตือนต่ออายุกรมธรรม์ประกันภัย",
            weight: "bold",
            size: "sm",
            wrap: true,
          },
        ],
        paddingTop: "none",
        offsetTop: "none",
        offsetBottom: "none",
      },
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            contents: [
              {
                type: "span",
                text: "อลิอันซ์ อยุธยา ประกันภัย ขอเรียนให้คุณทราบว่า กรมธรรม์รถยนต์ภาคสมัครใจของคุณกำลังหมดความคุ้มครอง โดยมีรายละเอียดดังนี้",
                size: "xxs",
              },
            ],
            wrap: true,
            offsetTop: "none",
          },
        ],
        paddingTop: "md",
        offsetTop: "none",
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "กรมธรรม์ :",
                size: "xs",
                color: "#aaaaaa",
                margin: "none",
                flex: 4,
              },
              {
                type: "text",
                text: "{value1}",
                size: "xs",
                flex: 5,
              },
            ],
          },
        ],
        offsetTop: "md",
      },
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            contents: [
              {
                type: "span",
                text: "เราขอแนะนำให้คุณแจ้งต่ออายุกรมธรรม์ ตามรายละเอียดในใบแจ้งเตือน สอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ตัวแทนของคุณ หรือติดต่อแผนกลูกค้าสัมพันธ์ได้ที่เบอร์ 1292",
                size: "xxs",
              },
            ],
            wrap: true,
            offsetTop: "none",
            margin: "none",
          },
        ],
        paddingTop: "md",
        offsetTop: "none",
      },
      {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            contents: [
              {
                type: "span",
                text: "อลิอันซ์ อยุธยา ประกันภัย หวังเป็นอย่างยิ่งว่าจะได้รับความไว้วางใจให้เป็นผู้คุ้มครองผลประโยชน์ของคุณ  และบุคคลที่คุณรักต่อไป",
                size: "xxs",
              },
            ],
            wrap: true,
            offsetTop: "none",
          },
        ],
        paddingTop: "xs",
        offsetTop: "none",
      },
      {
        type: "box",
        layout: "vertical",
        spacing: "none",
        contents: [
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "uri",
              label: "ดูรายละเอียด",
              uri: "https://liff.line.me/2007569728-0EgyRv75/nrbSRyGtJT?page_id=1749185567517",
            },
            offsetTop: "none",
            offsetBottom: "none",
            offsetStart: "none",
            offsetEnd: "none",
            gravity: "bottom",
            margin: "none",
          },
        ],
        flex: 0,
        borderColor: "#F6F6F6",
        offsetBottom: "none",
        paddingBottom: "none",
        paddingTop: "lg",
        offsetTop: "none",
        offsetStart: "none",
      },
    ],
    paddingAll: "none",
    paddingTop: "xl",
    paddingBottom: "lg",
    paddingStart: "xxl",
    paddingEnd: "xxl",
  },
  footer: {
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "text",
        contents: [
          {
            type: "span",
            text: "Learn more about LINE Official Notification ",
            color: "#BDBDBD",
          },
          {
            type: "span",
            text: "here",
            decoration: "underline",
            color: "#00b4ff",
          },
          {
            type: "span",
            text: ".",
            color: "#BDBDBD",
          },
        ],
        wrap: true,
        size: "10px",
        align: "center",
      },
    ],
    margin: "none",
    borderWidth: "none",
    paddingTop: "sm",
    paddingBottom: "md",
    action: {
      type: "uri",
      label: "action",
      uri: "https://today.line.me/th/v2/article/PGjoaWV",
    },
  },
  styles: {
    header: {
      backgroundColor: "#06C755",
    },
    footer: {
      backgroundColor: "#EEEEEE",
    },
  },
};