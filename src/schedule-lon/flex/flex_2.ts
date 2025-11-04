export const flex_2 = {
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
            text: "Policy Renewal Notification Service",
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
                text: "Allianz Ayudhya General Insurance would like to inform you that your voluntary motor insurance policy is about to expire. Please find the details below:",
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
                text: "Policy No :",
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
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "License Plate No :",
                size: "xs",
                color: "#aaaaaa",
                flex: 4,
              },
              {
                type: "text",
                text: "{value2}",
                size: "xs",
                flex: 5,
              },
            ],
          },
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "Expiry Date :",
                size: "xs",
                color: "#aaaaaa",
                flex: 4,
              },
              {
                type: "text",
                text: "{value3}",
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
                text: "We recommend that you renew your policy as indicated in the renewal notice. For further information, please contact your insurance agent or reach our Customer Service Center at 1292.",
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
        layout: "horizontal",
        contents: [
          {
            type: "text",
            contents: [
              {
                type: "span",
                text: "Allianz Ayudhya General Insurance sincerely hopes to continue being your trusted partner in protecting you and your loved ones.",
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
              label: "more information",
              uri: "{value4}",
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
