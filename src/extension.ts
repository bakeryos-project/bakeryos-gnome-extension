
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import St from 'gi://St';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import GObject from 'gi://GObject';
import Clutter from 'gi://Clutter';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

export default class BakeryOSExtension extends Extension {
  private _theme: any = null;
  private _powerButton: any = null;
  private _systemIndicator: any = null;
  private _stylesheetFile: any = null;

  enable() {

    Main.layoutManager.connectObject('startup-complete', () => Main.overview.hide(), this);
    this._stylesheetFile = this.dir.get_child('styles/stylesheet.css');
    const stage = global.stage as any;
    this._theme = St.ThemeContext.get_for_stage(stage).get_theme();

    if (this._stylesheetFile.query_exists(null)) {
      this._theme.load_stylesheet(this._stylesheetFile);
      console.log("CSS file loaded!");
    } else {
      console.error("CSS file not found at: " + this._stylesheetFile.get_path());
    }

  }

  disable() {
    if (this._theme && this._stylesheetFile) {
      this._theme.unload_stylesheet(this._stylesheetFile);
    }
    this._theme = null;
    this._stylesheetFile = null;
    Main.layoutManager.disconnectObject(this);
  }

}
