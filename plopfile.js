const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + " is required";
    }
    return true;
  };
};

module.exports = function (plop) {
  plop.setGenerator("controller", {
    description: "Generate a new controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the controller?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/controllers/{{camelCase name}}Controller.js",
        templateFile: "plop-templates/controller.js.hbs",
      },
      {
        type: "add",
        path: "src/models/{{camelCase name}}Model.js",
        templateFile: "plop-templates/model.js.hbs",
      },
      {
        type: "add",
        path: "src/repository/{{camelCase name}}Repository.js",
        templateFile: "plop-templates/repository.js.hbs",
      },
      {
        type: "add",
        path: "src/routes/{{camelCase name}}Routes.js",
        templateFile: "plop-templates/routes.js.hbs",
      },
      {
        type: "add",
        path: "src/validations/{{camelCase name}}Validations.js",
        templateFile: "plop-templates/validations.js.hbs",
      },
    ],
  });
};
