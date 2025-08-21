import TicTacToeView from '@/views/tictactoe/TicTacToeView.vue';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('TicTacToe View', () => {
  it('plays a simple winning scenario for X', async () => {
    const wrapper = mount(TicTacToeView, {
      global: {
        plugins: [createPinia()],
      },
    });
    const cells = () => wrapper.findAll('button');
    // Board buttons are first 9 buttons in our view
    await cells()[0].trigger('click'); // X
    await cells()[3].trigger('click'); // O
    await cells()[1].trigger('click'); // X
    await cells()[4].trigger('click'); // O
    await cells()[2].trigger('click'); // X wins
    expect(wrapper.text()).toContain('Victoire de X');
  });
});
