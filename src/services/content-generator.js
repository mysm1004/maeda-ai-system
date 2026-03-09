const Anthropic = require('@anthropic-ai/sdk');

class ContentGenerator {
  constructor(db) {
    this.db = db;
    this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async generateLP(params) {
    const { lawFirmName, services, targetAudience, tone, additionalInfo } = params;
    const prefs = this._getPreferences();

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: 'あなたは法律事務所専門のLP制作エキスパートです。SEO最適化されたHTML/CSSを含むLPを生成します。前田さんの好み: ' + JSON.stringify(prefs),
      messages: [{
        role: 'user',
        content: 'LP作成依頼:\n事務所名: ' + (lawFirmName || '前田法律事務所') +
          '\nサービス: ' + (services || '一般民事') +
          '\nターゲット: ' + (targetAudience || '個人') +
          '\nトーン: ' + (tone || '信頼感・安心感') +
          '\n追加情報: ' + (additionalInfo || 'なし') +
          '\n\nレスポンシブ対応のHTML/CSSでLPを生成してください。'
      }]
    });

    return response.content[0].text;
  }

  async generateProposal(params) {
    const { clientName, projectType, budget, deadline, requirements } = params;
    const prefs = this._getPreferences();

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: 'あなたは法律事務所の提案書作成エキスパートです。プロフェッショナルな提案書を作成します。前田さんの好み: ' + JSON.stringify(prefs),
      messages: [{
        role: 'user',
        content: '提案書作成:\nクライアント: ' + (clientName || '未定') +
          '\n案件種別: ' + (projectType || '一般') +
          '\n予算: ' + (budget || '要相談') +
          '\n納期: ' + (deadline || '未定') +
          '\n要件: ' + (requirements || '詳細未定') +
          '\n\nマークダウン形式で提案書を生成してください。'
      }]
    });

    return response.content[0].text;
  }

  async generateDM(params) {
    const { targetType, purpose, channel, length } = params;
    const prefs = this._getPreferences();

    const response = await this.anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: 'あなたは法律事務所のDM/メッセージ作成エキスパートです。効果的なDMを作成します。前田さんの好み: ' + JSON.stringify(prefs),
      messages: [{
        role: 'user',
        content: 'DM作成:\nターゲット: ' + (targetType || '既存顧客') +
          '\n目的: ' + (purpose || 'フォローアップ') +
          '\nチャネル: ' + (channel || 'メール') +
          '\n文字数目安: ' + (length || '300文字程度') +
          '\n\n効果的なDMを生成してください。'
      }]
    });

    return response.content[0].text;
  }

  _getPreferences() {
    const prefs = this.db.prepare('SELECT category, key, value FROM user_preferences ORDER BY confidence DESC LIMIT 20').all();
    var grouped = {};
    for (var i = 0; i < prefs.length; i++) {
      var p = prefs[i];
      if (!grouped[p.category]) grouped[p.category] = {};
      grouped[p.category][p.key] = p.value;
    }
    return grouped;
  }
}

module.exports = ContentGenerator;
