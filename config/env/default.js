/**
 * Expose
 */

const debug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  env: process.env.NODE_ENV || 'development',
  debug,
  network: process.env.NETWORK,
  chainId: process.env.CHAIN_ID,
  portis_id: process.env.PORTIS_ID,
  fortmatic_id: process.env.FORTMATIC_ID,
  onboard_id: process.env.ONBOARD_ID,
  infura_id: process.env.INFURA_PROJECT_ID,
  rpc_url: `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
  squarelink_id: process.env.SQUARELINK_ID,
  email: process.env.EMAIL,
}
