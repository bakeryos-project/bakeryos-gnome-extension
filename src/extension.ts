import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import St from 'gi://St';
import { Extension, } from 'resource:///org/gnome/shell/extensions/extension.js';
import { BakeryOSIndicator } from "./quickSettings.js";

export default class BakeryOSExtension extends Extension {
    private _indicator: any = null;
    private _theme: any = null;

    enable() {
        this._indicator = new BakeryOSIndicator();
        Main.panel.statusArea.quickSettings!.addExternalIndicator(this._indicator);
        let stylesheet = this.dir.get_child('./styles/stylesheet.css');
        this._theme = St.ThemeContext.get_for_stage(global.stage).get_theme();

        if (stylesheet.query_exists(null)) {
            this._theme.load_stylesheet(stylesheet);
            console.log("CSS file loaded!");
        } else {
            console.error("CSS file not found at: " + stylesheet.get_path());
        }
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;

        let stylesheet = this.dir.get_child('stylesheet.css');
        this._theme.unload_stylesheet(stylesheet);
        this._theme = null;
    }
}