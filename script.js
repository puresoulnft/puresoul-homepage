// Contract configuration for reading stats only
const CONTRACT_ADDRESS = '0x33df1aeb441456dd1257c1011c6d776e8464ebf5';
const BSC_RPC_URL = 'https://bsc-dataseed1.binance.org/';

// Minimal ABI for reading stats only
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "remainingSupply", 
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Initialize on page load
window.addEventListener('load', async function() {
    // Update collection stats
    await updateCollectionStats();
    
    // Update stats periodically
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

// Update collection stats from contract (read-only)
async function updateCollectionStats() {
    try {
        // Create read-only contract for stats
        const readProvider = new ethers.JsonRpcProvider(BSC_RPC_URL);
        const readContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readProvider);
        
        const totalSupply = await readContract.totalSupply();
        const remainingSupply = await readContract.remainingSupply();
        
        document.getElementById('mintedCount').textContent = totalSupply.toString();
        document.getElementById('remainingCount').textContent = remainingSupply.toString();
    } catch (error) {
        console.error('Error updating stats:', error);
        document.getElementById('mintedCount').textContent = 'Error';
        document.getElementById('remainingCount').textContent = 'Error';
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