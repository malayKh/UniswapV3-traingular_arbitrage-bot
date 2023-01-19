# UniswapV3-traingular_arbitrage-bot
This bot calculates surface triangular arbitrage between 3 uniswap pairs. You can then tell it to execute a transaction on UniswapV3 only if it makes a profit.
The bot also makes use of Uniswap Flashswaps to borrow capital and return it at the end of the transaction so you can technically place trades with zero capital 
requirements and return the borrowed capital after making a profit and paying back the transaction fees.

## How does the bot work?
The bot makes queries to GraphQL to get back UniswapV3 pairs data. Then proceeds to calculate triangular surface arbitrage on the pairs having sufficient liquidity.
The pairs having surface arbitrage and inspected to have suffiect depth to make profitable trades. If found profitable, you can proceed to make calls to the uniswap 
contract my running the scripts provided.

## Scripts to use the bot
1. Start pair calculations
2. Calculate depth
3. Make contract calls
