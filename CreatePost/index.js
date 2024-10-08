const MiddlewareHandler = require("azure-middleware");
const Joi = require("joi");
const { validateBody } = require("../middleware/validator");
const createPostHandler = require("./handler");

const schema = Joi.object({
  blog: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const createPost = new MiddlewareHandler()
  .use((context) => {
    validateBody(context, context.req.body, schema);
    context.next();
  })
  .use(createPostHandler)
  .catch((error, context) => {
    context.res = {
      status: 500,
      body: error.message,
    };
    context.done();
  })
  .listen();

module.exports = createPost;

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
