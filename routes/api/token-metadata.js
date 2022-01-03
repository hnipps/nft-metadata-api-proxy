var express = require("express");
var router = express.Router();
var metadataRepo = require("../../helpers/metadata-repo");

router.get("/", function (req, res, next) {
  metadataRepo.getAll().then((totalSupply) => {
    return res.json({ totalSupply: totalSupply });
  });
});

router.get("/:tokenId", function (req, res, next) {
  let tokenId = parseInt(req.params.tokenId);
  metadataRepo.getById(tokenId).then((data) => {
    return res.json(data);
  });
});

router.get("/image/:imageFilename", function (req, res, next) {
  const imageFilename = req.params.imageFilename;
  const id = parseInt(imageFilename.split(".")[0]);
  metadataRepo.getImageById(id, imageFilename).then((response) => {
    res.set({
      "content-length": response.headers.get("content-length"),
      "content-disposition": `inline;filename="${imageFilename}"`,
      "content-type": response.headers.get("content-type"),
    });
    response.body.pipe(res);
    response.body.on("error", () => {}); // To handle failure
  });
});

module.exports = router;
