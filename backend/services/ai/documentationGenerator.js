const documentationMap = require("./documentationMap");

exports.generateDocumentation = (topics = []) => {

  const documentation = [];

  const added = new Set();

  topics.forEach((topic) => {

    Object.keys(documentationMap).forEach((key) => {

      if (
        topic.toLowerCase().includes(key.toLowerCase()) &&
        !added.has(key)
      ) {

        documentation.push({
          topic: key,
          ...documentationMap[key],
        });

        added.add(key);

      }

    });

  });

  return {
    documentation,
  };

};