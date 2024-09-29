const { insertEntity } = require("../services/tableService");

module.exports = async function (context, req) {
  try {
    if (!req.body) {
      return (context.res = {
        status: 400,
        body: "Please pass a request body",
      });
    }

    const { blog, title, content } = req.body;

    if (!title || !blog || !content) {
      return (context.res = {
        status: 400,
        body: "Please pass blog, title, content",
      });
    }
    const entity = {
      PartitionKey: { _: "blog" },
      RowKey: { _: new Date().getTime().toString() },
      title: { _: title },
      content: { _: content },
    };

    const result = await insertEntity("Posts", entity);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

// //new way
// const { insertEntity } = require("../services/tableServiceNew");
// module.exports = async function (context, req) {
//   try {
//     if (!req.body) {
//       return (context.res = {
//         status: 400,
//         body: "Please pass a request body",
//       });
//     }

//     const { blog, title, content } = req.body;

//     if (!title || !blog || !content) {
//       return (context.res = {
//         status: 400,
//         body: "Please pass blog, title, content",
//       });
//     }

//     const entity = {
//       partitionKey: blog,
//       rowKey: new Date().getTime().toString(),
//       title,
//       content,
//     };

//     await insertEntity("Posts", entity);

//     context.res = {
//       body: entity,
//     };
//   } catch (error) {
//     context.res = {
//       status: 500,
//       body: error.message,
//     };
//   }
// };
