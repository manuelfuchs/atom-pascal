'use babel';

import PascalView from './pascal-view';
import { CompositeDisposable } from 'atom';

export default {

  pascalView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pascalView = new PascalView(state.pascalViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pascalView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pascal:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pascalView.destroy();
  },

  serialize() {
    return {
      pascalViewState: this.pascalView.serialize()
    };
  },

  toggle() {
    console.log('Pascal was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
