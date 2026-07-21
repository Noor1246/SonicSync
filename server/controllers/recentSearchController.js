const RecentSearch = require("../models/RecentSearch");

// Save Search
const saveSearch = async (req, res) => {
  try {
    const { user, query } = req.body;

    if (!query.trim()) {
      return res.json();
    }

    await RecentSearch.deleteMany({
      user,
      query,
    });

    await RecentSearch.create({
      user,
      query,
    });

    const searches = await RecentSearch.find({
      user,
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(searches);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Searches
const getSearches = async (req, res) => {
  try {
    const searches = await RecentSearch.find({
      user: req.params.userId,
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(searches);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  saveSearch,
  getSearches,
};