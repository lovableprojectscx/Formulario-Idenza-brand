import { test, expect } from '@playwright/test';

test.describe('Formulario de Identidad de Marca — E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('completes full 7-step wizard and submits briefing', async ({ page }) => {
    await page.goto('/');

    // Check header
    await expect(page.locator('h1')).toContainText('Cuéntenos de su negocio para diseñar su marca');
    await expect(page.getByRole('heading', { name: 'El negocio' })).toBeVisible();

    // Step 1: Fill business details
    await page.getByPlaceholder(/Ej. Industrias Metálicas Denza/i).fill('Metalúrgica Andina');
    await page.getByRole('button', { name: 'Escritorios' }).click();
    await page.getByRole('button', { name: 'Estantería metálica' }).click();
    await page.getByPlaceholder(/Ej. 2018/i).fill('2019');
    await page.getByPlaceholder(/Ej. Lima, envíos a todo el Perú/i).fill('Arequipa y sur del Perú');
    await page.getByPlaceholder(/Cuéntenos brevemente el origen del negocio/i).fill('Empezamos en un garaje familiar fabricando estantes para almacenes.');
    
    // Proceed to Step 2
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'Sus clientes' })).toBeVisible();

    // Step 2: Clients and pricing
    await page.getByRole('button', { name: 'Empresas y oficinas' }).click();
    await page.getByRole('button', { name: 'Tiendas y almacenes' }).click();
    await page.getByRole('button', { name: /Más caros, mejor calidad/i }).click();
    await page.getByPlaceholder(/Lo que más valoran sus compradores/i).fill('Garantía de 5 años y acabado de pintura al horno sin rayones.');
    
    // Proceed to Step 3
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'La competencia' })).toBeVisible();

    // Step 3: Competitors
    await page.getByPlaceholder(/Nombres o enlaces de competidores/i).fill('Muebles Industriales Sur (facebook.com/mueblesur)');
    await page.getByPlaceholder(/Ej. Bajar calibres de metal/i).fill('Usar chapas delgadas sin informar al cliente.');

    // Proceed to Step 4
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'La personalidad' })).toBeVisible();

    // Step 4: Personality
    await page.getByPlaceholder(/Ej. Un maestro experimentado/i).fill('Un ingeniero minucioso que habla con franqueza técnica.');
    await page.getByPlaceholder(/Ej. Resistente, puntual, serio/i).fill('Robusto, puntual, garantizado');

    // Proceed to Step 5
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'El logo' })).toBeVisible();

    // Step 5: Logo preferences
    await page.getByRole('button', { name: 'No tengo' }).click();
    await page.getByRole('button', { name: 'Solo el nombre' }).click();
    await page.getByPlaceholder(/Ej. Azul marino, gris acero/i).fill('Gris grafito y naranja maquinaria');

    // Proceed to Step 6
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'Dónde va a ir la marca' })).toBeVisible();

    // Step 6: Touchpoints
    await page.getByRole('button', { name: 'Placa en los muebles' }).click();
    await page.getByRole('button', { name: 'Camioneta' }).click();
    await page.getByPlaceholder(/Ej. Antes de fin de mes/i).fill('En 3 semanas antes de una feria');

    // Proceed to Step 7
    await page.getByRole('button', { name: /Siguiente parte/i }).click();
    await expect(page.getByRole('heading', { name: 'Sus datos' })).toBeVisible();

    // Step 7: Validation check - click submit without required fields
    await page.getByRole('button', { name: /Terminar y enviar mis respuestas/i }).click();
    await expect(page.getByText(/Por favor ingrese su nombre/i)).toBeVisible();

    // Fill contact details
    await page.getByPlaceholder(/Ej. Carlos Mendoza/i).fill('Carlos Mendoza');
    await page.getByPlaceholder(/Ej. Dueño/i).fill('Gerente de Operaciones');
    await page.getByPlaceholder(/\+51 987 654 321/i).fill('+51 987654321');

    // Submit form
    await page.getByRole('button', { name: /Terminar y enviar mis respuestas/i }).click();

    // Verify Success Screen
    await expect(page.getByRole('heading', { name: 'Respuestas recibidas' })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Metalúrgica Andina').first()).toBeVisible();
    await expect(page.getByText('Carlos Mendoza').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Avisar por WhatsApp/i })).toBeVisible();
  });
});
