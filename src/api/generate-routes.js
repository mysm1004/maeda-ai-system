const express = require('express');
const router = express.Router();
const ContentGenerator = require('../services/content-generator');

module.exports = function(db) {
  const generator = new ContentGenerator(db);

  router.post('/api/generate/lp', async (req, res) => {
    try {
      const result = await generator.generateLP(req.body);
      res.json({ content: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/api/generate/proposal', async (req, res) => {
    try {
      const result = await generator.generateProposal(req.body);
      res.json({ content: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/api/generate/dm', async (req, res) => {
    try {
      const result = await generator.generateDM(req.body);
      res.json({ content: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
