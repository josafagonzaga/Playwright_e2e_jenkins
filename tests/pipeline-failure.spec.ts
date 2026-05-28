import { expect, test } from '@playwright/test';

test.describe('Validacao da esteira', () => {
  test('deve falhar intencionalmente para validar a esteira @pipeline-failure', async () => {
    // Temporary failure used only to validate the CI/Jenkins test stage.
    expect('pipeline should fail').toBe('pipeline should pass');
  });
});
