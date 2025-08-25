const TermsSection = require('../database/models/Terms');

async function routes(fastify, options) {
  // Get terms sections for a specific language
  fastify.get('/', async (request, reply) => {
    try {
      const { lang } = request.query;
      
      if (!lang || !['en', 'sv'].includes(lang)) {
        return reply.code(400).send({ error: 'Invalid language. Use "en" or "sv"' });
      }

      const sections = await TermsSection.findAll({
        where: { lang_code: lang },
        order: [['sort_order', 'ASC']],
        attributes: ['id', 'title', 'body', 'sort_order']
      });

      return { sections };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get all terms sections (admin endpoint)
  fastify.get('/all', async (request, reply) => {
    try {
      const sections = await TermsSection.findAll({
        order: [['lang_code', 'ASC'], ['sort_order', 'ASC']]
      });

      return { sections };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = routes;
