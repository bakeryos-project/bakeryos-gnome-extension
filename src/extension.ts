import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import St from 'gi://St';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class BakeryOSExtension extends Extension {
  private _theme: any = null;
  private _stylesheetFile: any = null;
  private _quickSettingsMenu: any = null;
  private _powerItem: any = null;
  private _powerItemParent: any = null;
  private _powerItemIndex = 0;

  enable() {
    Main.layoutManager.connectObject(
      'startup-complete',
      () => {
        Main.overview.hide();
        this._removeQuickSettingsPowerButton();
      },
      this,
    );

    this._stylesheetFile = this.dir.get_child('styles/stylesheet.css');
    const stage = global.stage as any;
    this._theme = St.ThemeContext.get_for_stage(stage).get_theme();

    if (this._stylesheetFile.query_exists(null)) {
      this._theme.load_stylesheet(this._stylesheetFile);
      console.log('CSS file loaded!');
    } else {
      console.error(
        'CSS file not found at: ' + this._stylesheetFile.get_path(),
      );
    }

    this._quickSettingsMenu = Main.panel.statusArea.quickSettings?.menu ?? null;
    this._quickSettingsMenu?.connectObject(
      'open-state-changed',
      () => this._removeQuickSettingsPowerButton(),
      this,
    );

    this._removeQuickSettingsPowerButton();
  }

  disable() {
    this._quickSettingsMenu?.disconnectObject(this);
    this._quickSettingsMenu = null;

    this._restoreQuickSettingsPowerButton();

    if (this._theme && this._stylesheetFile) {
      this._theme.unload_stylesheet(this._stylesheetFile);
    }
    this._theme = null;
    this._stylesheetFile = null;
    Main.layoutManager.disconnectObject(this);
  }

  private _findQuickSettingsPowerButton(
    actor: any = Main.panel.statusArea.quickSettings?.menu?.box,
  ): any {
    if (!actor)
      return null;

    if (
      actor.has_style_class_name?.('icon-button') &&
      (actor.icon_name === 'system-shutdown-symbolic' || actor.hasMenu === true)
    ) {
      return actor;
    }

    for (const child of actor.get_children()) {
      const found = this._findQuickSettingsPowerButton(child);
      if (found)
        return found;
    }

    return null;
  }

  private _removeQuickSettingsPowerButton() {
    if (this._powerItem || !this._quickSettingsMenu)
      return;

    const item = this._findQuickSettingsPowerButton();
    const parent = item?.get_parent();
    if (!item || !parent)
      return;

    this._powerItem = item;
    this._powerItemParent = parent;
    this._powerItemIndex = parent.get_children().indexOf(item);
    parent.remove_child(item);
  }

  private _restoreQuickSettingsPowerButton() {
    const item = this._powerItem;
    const parent = this._powerItemParent;

    this._powerItem = null;
    this._powerItemParent = null;

    if (!item || !parent || item.get_parent())
      return;

    const index = Math.min(this._powerItemIndex, parent.get_children().length);
    parent.insert_child_at_index(item, index);
  }
}
