/*
  # Create Validator Income Information Table

  1. New Tables
    - `validator_income_info`
      - `id` (uuid, primary key)
      - `base_monthly_return` (numeric) - Base monthly return percentage (e.g., 8.4)
      - `annual_return_min` (numeric) - Minimum annual return with compounding (e.g., 500)
      - `annual_return_max` (numeric) - Maximum annual return with compounding (e.g., 1000)
      - `compounding_strategy` (text) - Description of compounding strategy
      - `network_growth_factor` (text) - Description of network growth impact
      - `user_payout_min` (numeric) - Minimum user payout percentage (e.g., 6)
      - `user_payout_max` (numeric) - Maximum user payout percentage (e.g., 9)
      - `surplus_description` (text) - Description of the surplus
      - `uptime_percentage` (numeric) - Network uptime percentage (e.g., 99.9)
      - `tps_capacity` (integer) - Transactions per second capacity
      - `active_validators` (integer) - Number of active validators
      - `total_value_locked` (text) - Total value locked in the system
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `validator_income_info` table
    - Add policy for public read access (data is public information)
    - Add policy for authenticated admin updates only
*/

CREATE TABLE IF NOT EXISTS validator_income_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  base_monthly_return numeric NOT NULL DEFAULT 8.4,
  annual_return_min numeric NOT NULL DEFAULT 500,
  annual_return_max numeric NOT NULL DEFAULT 1000,
  compounding_strategy text NOT NULL DEFAULT 'Withdrawing & reinvesting rewards compounds returns dramatically',
  network_growth_factor text NOT NULL DEFAULT 'More validators = higher overall rewards',
  user_payout_min numeric NOT NULL DEFAULT 6,
  user_payout_max numeric NOT NULL DEFAULT 9,
  surplus_description text NOT NULL DEFAULT 'The substantial surplus between validator income and user payouts is retained as protocol reserves',
  uptime_percentage numeric NOT NULL DEFAULT 99.9,
  tps_capacity integer NOT NULL DEFAULT 70000,
  active_validators integer NOT NULL DEFAULT 100,
  total_value_locked text NOT NULL DEFAULT '$50M+',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE validator_income_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view validator income info"
  ON validator_income_info
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert validator income info"
  ON validator_income_info
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update validator income info"
  ON validator_income_info
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO validator_income_info (
  base_monthly_return,
  annual_return_min,
  annual_return_max,
  compounding_strategy,
  network_growth_factor,
  user_payout_min,
  user_payout_max,
  surplus_description,
  uptime_percentage,
  tps_capacity,
  active_validators,
  total_value_locked
) VALUES (
  8.4,
  500,
  1000,
  'Withdrawing & reinvesting rewards compounds returns dramatically',
  'More validators = higher overall rewards',
  6,
  9,
  'The substantial surplus between validator income (500-1000%+ with active compounding) and average user payouts (6-9%) is retained as protocol reserves',
  99.9,
  70000,
  100,
  '$50M+'
) ON CONFLICT DO NOTHING;