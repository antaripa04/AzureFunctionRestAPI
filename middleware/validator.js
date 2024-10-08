exports.validateBody = async (context, body, schema) => {
  try {
    if (!body) {
      context.res = {
        status: 400,
        body: "Please pass a request body",
      };

      context.done();
      return;
    }

    await schema.validateAsync(body);
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
    context.done();
  }
};
