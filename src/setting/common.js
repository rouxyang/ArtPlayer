import { append } from '../utils';

export default class Common {
  constructor(option) {
    this.option = option;
  }

  apply(art) {
    this.art = art;
    const { $setting } = this.option;
    this.$header = $setting.querySelector('.art-setting-header');
    this.$body = $setting.querySelector('.art-setting-body');
    append(this.$body, '———— 先占坑，暂无设置 ————');
  }
}
