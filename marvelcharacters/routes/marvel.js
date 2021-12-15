const express = require("express");
const router = express.Router();
const marvelData = require("../data/marvel");

router.get("/", async (req, res) => {
  try {
    res.render("pages/search", {
      title: "Character Finder",
    });
  } catch (error) {
    res.status(404).json({ message: "Page not found" });
  }
});

router.post("/search", async (req, res) => {
  let searchVal = req.body.searchTerm;
  if (!searchVal) {
    res.status(400).render("pages/error", {
      error: "Expected at least one parameter",
      title: "Error",
    });
    return;
  } else if (typeof searchVal != "string") {
    res.status(400).render("pages/error", {
      error: "Expected parameter of type string",
      title: "Error",
    });
    return;
  } else if (searchVal.trim().length == 0) {
    res.status(400).render("pages/error", {
      error: "string parameter cannot be empty spaces",
      title: "Error",
    });
    return;
  }
  searchVal = searchVal.trim();

  try {
    let haserrors = false;

    const getData = await marvelData.getMarvelSearchCharacters(searchVal);

    if (getData.data.results.length === 0) {
      haserrors = true;
      res.status(404).render("pages/search", {
        errorval: haserrors,
        searchTerm: searchVal,
        title: "Characters Finder",
      });
      return;
    }

    res.render("pages/found", {
      names: getData.data.results,
      title: "Characters Found",
      searchTerm: searchVal,
    });
  } catch (error) {
    res.status(404).json({ message: "Data not found" });
  }
});

router.get("/characters/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).render("pages/error", {
      error: "Search box cannot be empty",
      title: "Error",
    });
    return;
  } else if (isNaN(Number(req.params.id))) {
    res.status(400).render("pages/error", {
      error: "Expected parameter of type number",
      title: "Error",
    });
    return;
  } else if (req.params.id.trim().length == 0) {
    res.status(400).render("pages/error", {
      error: "Search box cannot be empty spaces",
      title: "Error",
    });
    return;
  }
  // parseint implement
  try {
    const getData = await marvelData.getMarvelCharacters(req.params.id);

    res.render("pages/characters", {
      names: getData.data.results,
      title: getData.data.results[0].name,
      description: getData.data.results[0].description,
      image:
        getData.data.results[0].thumbnail.path +
        "/portrait_fantastic." +
        getData.data.results[0].thumbnail.extension,
    });
  } catch (error) {
    if (!error.response) {
      res.status(404).json({ message: "Data not found" });
      return;
    }
    if (error.response.status === 404) {
      res.status(404).render("pages/error", {
        error: "No data found for the character Id " + req.params.id,
      });
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  }
});

module.exports = router;
