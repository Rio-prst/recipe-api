import { Pool } from 'pg';
import { db as dbClient } from '../config/db';

export interface Ingredient {
  id: number;
  recipeId: number;
  name: string;
  quantity: string;
}

interface IngredientRow {
  id: string;
  recipeId: string;
  name: string;
  quantity: string;
}

class IngredientRepository {
  private readonly db: Pool = dbClient;

  private mapRow(row: IngredientRow): Ingredient {
    return {
      id: Number(row.id),
      recipeId: Number(row.recipeId),
      name: row.name,
      quantity: row.quantity,
    };
  }

  async create(recipeId: number, name: string, quantity: string): Promise<Ingredient> {
    const result = await this.db.query(
      `INSERT INTO ingredients (recipe_id, name, quantity) VALUES ($1, $2, $3)
      RETURNING id, recipe_id as "recipeId", name, quantity`,
      [recipeId, name, quantity]
    );

    return this.mapRow(result.rows[0]);
  }

  async findByRecipeId(recipeId: number): Promise<Ingredient[]> {
    const result = await this.db.query(
      `SELECT id, recipe_id as "recipeId", name, quantity FROM ingredients WHERE recipe_id = $1;`,
      [recipeId]
    );

    return result.rows.map((row) => this.mapRow(row));;
  }

  async findById(id: number): Promise<Ingredient | null> {
    const result = await this.db.query(
      `SELECT id, recipe_id as "recipeId", name, quantity FROM ingredients WHERE id = $1`,
      [id]
    );

    const row = result.rows[0];
    return row ? this.mapRow(row) : null;
  }

  async update(id: number, data: Partial<Omit<Ingredient, 'id' | 'recipeId'>>): Promise<Ingredient> {
    const fields: string[] = [];
    const values: (string | number)[] = [];
    let idx = 1;

    if (data.name) { fields.push(`name = $${idx++}`); values.push(data.name); }
    if (data.quantity) { fields.push(`quantity = $${idx++}`); values.push(data.quantity); }
    
    values.push(id);
    const res = await this.db.query(
      `UPDATE ingredients SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, recipe_id as "recipeId", name, quantity;`,
      values
    );
    return this.mapRow(res.rows[0]);
  }

  async delete(id: number): Promise<void> {
    await this.db.query(`DELETE FROM ingredients WHERE id = $1`, [id]);
  }
}

export default IngredientRepository;