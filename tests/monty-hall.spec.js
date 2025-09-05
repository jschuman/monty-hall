// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Monty Hall Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the game page', async ({ page }) => {
    // Check that the main title is visible
    await expect(page.getByText('The Monty Hall Problem')).toBeVisible();
    
    // Check that the three game cards are present
    const cards = page.locator('[data-testid="flip-card"]');
    await expect(cards).toHaveCount(3);
    
    // Check that the decision panel is visible
    await expect(page.getByText('🎯 Decision Panel')).toBeVisible();
    
    // Check that the statistics section is present
    await expect(page.getByText('📊 Your Statistics')).toBeVisible();
    
    // Check that the auto play section is present
    await expect(page.getByText('🚀 Auto Play')).toBeVisible();
  });

  test('should allow player to choose a card', async ({ page }) => {
    // Click on the first card
    const firstCard = page.locator('[data-testid="flip-card"]').first();
    await firstCard.click();
    
    // Wait for the game to progress to the chosen state
    // Use a more specific selector to avoid strict mode violation
    await expect(page.getByRole('heading', { name: 'The host is revealing a goat...' })).toBeVisible();
    
    // Wait for the decision phase
    await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
    
    // Check that stay and switch buttons are present
    await expect(page.getByRole('button', { name: /Stay with Card/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Switch to Other Card/ })).toBeVisible();
  });

  test('should complete a full game with stay strategy', async ({ page }) => {
    // Click on the first card
    const firstCard = page.locator('[data-testid="flip-card"]').first();
    await firstCard.click();
    
    // Wait for decision phase
    await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
    
    // Click stay button
    await page.getByRole('button', { name: /Stay with Card/ }).click();
    
    // Check that we get a result (either win or loss)
    const resultText = page.locator('text=/🎉 YOU WIN! 🎉|😢 You Lost/');
    await expect(resultText).toBeVisible();
    
    // Check that the result shows the correct strategy
    await expect(page.getByText(/You stayed and chose Card/)).toBeVisible();
  });

  test('should complete a full game with switch strategy', async ({ page }) => {
    // Click on the first card
    const firstCard = page.locator('[data-testid="flip-card"]').first();
    await firstCard.click();
    
    // Wait for decision phase
    await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
    
    // Click switch button
    await page.getByRole('button', { name: /Switch to Other Card/ }).click();
    
    // Check that we get a result (either win or loss)
    const resultText = page.locator('text=/🎉 YOU WIN! 🎉|😢 You Lost/');
    await expect(resultText).toBeVisible();
    
    // Check that the result shows the correct strategy
    await expect(page.getByText(/You switched and chose Card/)).toBeVisible();
  });

  test('should show New Game button after game completion', async ({ page }) => {
    // Complete a game
    const firstCard = page.locator('[data-testid="flip-card"]').first();
    await firstCard.click();
    
    await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
    await page.getByRole('button', { name: /Stay with Card/ }).click();
    
    // Check that New Game button appears
    await expect(page.getByRole('button', { name: 'New Game' })).toBeVisible();
  });

  test('should reset game when New Game button is clicked', async ({ page }) => {
    // Complete a game first
    const firstCard = page.locator('[data-testid="flip-card"]').first();
    await firstCard.click();
    
    await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
    await page.getByRole('button', { name: /Stay with Card/ }).click();
    
    // Click New Game button
    await page.getByRole('button', { name: 'New Game' }).click();
    
    // Check that we're back to initial state
    await expect(page.getByText('Choose a card to begin the game!')).toBeVisible();
  });

  test('should update statistics after playing games', async ({ page }) => {
    // Play a few games to build up statistics
    for (let i = 0; i < 3; i++) {
      const firstCard = page.locator('[data-testid="flip-card"]').first();
      await firstCard.click();
      
      await expect(page.getByText('🎯 Make Your Final Decision')).toBeVisible();
      await page.getByRole('button', { name: /Stay with Card/ }).click();
      
      // Click New Game to reset for next game
      await page.getByRole('button', { name: 'New Game' }).click();
    }
    
    // Check that statistics are visible and show some games played
    await expect(page.getByText('📊 Your Statistics')).toBeVisible();
    // The total games should be greater than 0
    const totalGames = page.locator('text=/Total Games/').locator('..').locator('h5');
    await expect(totalGames).not.toHaveText('0');
  });

  test('should have auto play controls', async ({ page }) => {
    // Check that auto play section is visible
    await expect(page.getByText('🚀 Auto Play')).toBeVisible();
    
    // Check that strategy radio buttons are present
    await expect(page.getByRole('radio', { name: '🏠 Stay' })).toBeVisible();
    await expect(page.getByRole('radio', { name: '🔄 Switch' })).toBeVisible();
    
    // Check that number of games dropdown is present
    await expect(page.getByRole('combobox')).toBeVisible();
    
    // Check that begin button is present
    await expect(page.getByRole('button', { name: '🚀 Begin' })).toBeVisible();
  });

  test('should run auto play simulation', async ({ page }) => {
    // Set up auto play for 10 games with switch strategy
    await page.getByRole('radio', { name: '🔄 Switch' }).check();
    
    // Click on the combobox to open the dropdown
    await page.getByRole('combobox').click();
    // Click on the "10 games" option
    await page.getByRole('option', { name: '10 games' }).click();
    
    // Start auto play
    await page.getByRole('button', { name: '🚀 Begin' }).click();
    
    // Wait for auto play to complete (should take about 15 seconds for 10 games)
    await expect(page.getByRole('button', { name: '🚀 Begin' })).toBeVisible({ timeout: 20000 });
    
    // Check that statistics have been updated
    const totalGames = page.locator('text=/Total Games/').locator('..').locator('h5');
    await expect(totalGames).toHaveText('10');
  });
});
