// Solana configuration for reading stats using global solanaWeb3
const PROGRAM_ID = new solanaWeb3.PublicKey("2oAejyxAkU6Kfts9PNSWwgDFSs1YPEFpFtQb3kzkW8hK");
const COLLECTION_SEED = "pure_soulfinal5";

// Initialize Solana connection
const SOLANA_RPC_URL = 'https://api.devnet.solana.com'; // Change to mainnet when ready
const connection = new solanaWeb3.Connection(SOLANA_RPC_URL);

// Function to read live supply from Solana
async function readLiveSupply() {
  try {
    const [collectionAddress] = solanaWeb3.PublicKey.findProgramAddressSync(
      [Buffer.from(COLLECTION_SEED)],
      PROGRAM_ID
    );
    
    const accountInfo = await connection.getAccountInfo(collectionAddress);
    
    if (!accountInfo) {
      console.log('Collection account not found');
      return { totalSupply: 3333, currentSupply: 0, remaining: 3333 };
    }
    
    const data = accountInfo.data;
    
    // Use the correct offsets from your debug output
    const totalSupplyOffset = 99;
    const currentSupplyOffset = 103;
    
    const totalSupply = data.readUInt32LE(totalSupplyOffset);
    const currentSupply = data.readUInt32LE(currentSupplyOffset);
    const remaining = totalSupply - currentSupply;
    
    console.log('📊 Live Supply:', { totalSupply, currentSupply, remaining });
    
    return { totalSupply, currentSupply, remaining };
    
  } catch (error) {
    console.error('Error reading supply:', error);
    return { totalSupply: 3333, currentSupply: 0, remaining: 3333 };
  }
}

// Update collection stats from Solana contract
async function updateCollectionStats() {
    try {
        const supplyData = await readLiveSupply();
        
        // Update HTML elements
        const mintedElement = document.getElementById('mintedCount');
        const remainingElement = document.getElementById('remainingCount');
        
        if (mintedElement) {
            mintedElement.textContent = supplyData.currentSupply.toLocaleString();
        }
        if (remainingElement) {
            remainingElement.textContent = supplyData.remaining.toLocaleString();
        }
        
        return supplyData;
        
    } catch (error) {
        console.error('Error updating stats:', error);
        // Fallback values on error
        const mintedElement = document.getElementById('mintedCount');
        const remainingElement = document.getElementById('remainingCount');
        
        if (mintedElement) mintedElement.textContent = 'Error';
        if (remainingElement) remainingElement.textContent = 'Error';
    }
}

// Initialize on page load
window.addEventListener('load', async function() {
    // Update collection stats
    await updateCollectionStats();
    
    // Update stats periodically every 30 seconds
    setInterval(updateCollectionStats, 30000);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// FAQ functionality
function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const currentItem = faqItems[index];
    const answer = currentItem.querySelector('.faq-answer');
    const isActive = currentItem.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-answer').classList.remove('active');
    });
    
    // Open current item if it wasn't active
    if (!isActive) {
        currentItem.classList.add('active');
        answer.classList.add('active');
    }
}

// Redirect to mint dapp
function redirectToMintDapp() {
    // Replace with your actual mint dapp URL
    const MINT_DAPP_URL = 'https://mint.puresoulnft.com';
    window.location.href = MINT_DAPP_URL;
}

// Redirect to whitepaper
function redirectToWhitepaper() {
    // Replace with your actual whitepaper URL
    const WHITEPAPER_URL = './whitepaper.pdf';
    window.location.href = WHITEPAPER_URL;
}

// Redirect to lore page
function redirectToLore() {
    // Replace with your actual lore page URL
    const LORE_URL = 'https://divinelore.puresoulnft.com';
    window.location.href = LORE_URL;
}