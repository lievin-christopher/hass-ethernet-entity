const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class EthernetEntity extends LitElement {
    render() {
        return html`
		<style>
			:host {
				display: flex;
				align-items: center;
			}
			.flex {
				flex: 1;
				margin-left: 16px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				min-width: 0;
			}
			.iconContainer {
				position: relative;
				display: inline-block;
				width: 40px;
				border-radius: 50%;
				height: 40px;
				text-align: center;
				background-size: cover;
				line-height: 40px;
			}
			.up {
				color: var(--label-badge-green);
			}
			.down {
				color: var(--label-badge-grey);
			}
			.notPresent {
				color: var(--label-badge-red);
			}
		</style>
		<div class="iconContainer">
			<ha-icon
				class="${this._config.portStatus}"
				icon=${this._config.icon}
			></ha-icon>
		</div>
		<div class="flex">
			<div class="info">
				${this.displayName()}
			</div>
			<div class="state">
				${this._config.portStatus}
			</div>
		</div>
		`
    }
    static properties = {
        _hass: {},
        _config: {},
        stateObj: {},
        value: String,
    }

    setConfig(config) {
        this._config = JSON.parse(JSON.stringify(config));
    }

    displayName() {
        return this._config.name || this.stateObj.attributes.friendly_name;
    }

    set hass(hass) {
        this._hass = hass;
        this.stateObj = this._config.entity in hass.states ? hass.states[this._config.entity] : null;
        this._config.portStatus = this.stateObj.state;
        this._config.icon = 'mdi:ethernet';
    }

    getCardSize() {
        return 1;
    }

    stopPropagation(ev) {
        ev.stopPropagation();
    }
}
console.log('EthernetEntity');
customElements.define('ethernet-entity', EthernetEntity);
