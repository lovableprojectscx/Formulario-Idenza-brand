import { test, expect } from '@playwright/test';

test.describe('Panel de Recepción — E2E Admin Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('handles invalid password and rejects access', async ({ page }) => {
    await page.goto('/');

    // Open Admin Login
    await page.getByRole('button', { name: /Acceso del equipo/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Panel de Recepción' })).toBeVisible();

    // Type incorrect password
    await page.getByPlaceholder(/Contraseña.../i).fill('INCORRECT_PASS');
    await page.getByRole('button', { name: /Ingresar al Panel/i }).click();

    // Should display error
    await expect(page.getByText(/Contraseña incorrecta/i)).toBeVisible();
  });

  test('authenticates with ADMIN1223 and navigates Admin Panel', async ({ page }) => {
    await page.goto('/');

    // Open Admin Login
    await page.getByRole('button', { name: /Acceso del equipo/i }).first().click();

    // Type correct password
    await page.getByPlaceholder(/Contraseña.../i).fill('ADMIN1223');
    await page.getByRole('button', { name: /Ingresar al Panel/i }).click();

    // Verify Admin Dashboard is visible
    await expect(page.getByRole('heading', { name: 'Panel de Recepción' })).toBeVisible();
    await expect(page.getByText('Administración')).toBeVisible();
    await expect(page.getByText(/Total:/i)).toBeVisible();

    // Test status tabs
    await page.getByRole('button', { name: 'Nuevos' }).click();
    await page.getByRole('button', { name: 'En revisión' }).click();
    await page.getByRole('button', { name: 'Todos' }).click();

    // Test Search input
    const searchInput = page.getByPlaceholder(/Buscar por negocio, cliente o WhatsApp/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('TestSearch');

    // Test Return to form button
    await page.getByRole('button', { name: /Ver formulario/i }).click();
    await expect(page.getByRole('heading', { name: 'Cuéntenos de su negocio para diseñar su marca' })).toBeVisible();
  });
});
