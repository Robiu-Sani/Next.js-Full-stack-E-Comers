/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import OrderModel from '@/models/order.model';
import Product from '@/models/product.model';
import { GoogleGenAI } from '@google/genai';
import Category from '@/models/category.model';
import { IProduct } from "@/interface/product.interface";
import { Schema } from 'mongoose';


// Create a populated product interface
interface IPopulatedProduct extends Omit<IProduct, 'category' | 'subCategory'> {
  category: {
    _id: Schema.Types.ObjectId;
    name: string;
  };
  subCategory?: {
    _id: Schema.Types.ObjectId;
    name: string;
  };
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Company information that can be updated
const COMPANY_INFO = {
  name: "CodeBiruni Store",
  services: {
    web: ["E-commerce Development", "Web Applications", "Mobile Apps"],
    products: ["Electronics", "Fashion", "Home & Living", "Books", "Beauty"]
  },
  expertise: ["Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing"],
  contact: {
    email: "support@codebiruni.com",
    phones: ["+8801234567890", "+8809876543210"],
    location: "Dhaka, Bangladesh",
    address: "123 Business Street, Dhaka 1212"
  },
  social: {
    facebook: "https://facebook.com/codebiruni",
    instagram: "https://instagram.com/codebiruni",
    twitter: "https://twitter.com/codebiruni"
  }
};

// Update company information
export async function updateCompanyInfo(newInfo: Partial<typeof COMPANY_INFO>) {
  try {
    Object.assign(COMPANY_INFO, newInfo);
    return { success: true, message: "Company information updated successfully" };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, message: "Failed to update company information" };
  }
}

// Intent classification function
function classifyIntent(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (/(hi|hello|hey|good morning|good afternoon)/.test(lowerMessage)) return 'greeting';
  if (/(price|cost|how much|discount|offer)/.test(lowerMessage)) return 'pricing';
  if (/(order|track|delivery|shipping|status)/.test(lowerMessage)) return 'order_status';
  if (/(product|item|buy|purchase|shop)/.test(lowerMessage)) return 'product_info';
  if (/(budget|money|tk|taka|dollar|\$|৳)/.test(lowerMessage)) return 'budget_query';
  if (/(category|type|kind|variety)/.test(lowerMessage)) return 'category_info';
  if (/(contact|email|phone|address|location)/.test(lowerMessage)) return 'contact_info';
  if (/(return|refund|exchange|complaint)/.test(lowerMessage)) return 'return_policy';
  if (/(thank|thanks|appreciate)/.test(lowerMessage)) return 'gratitude';
  
  return 'general';
}

// Generate base response based on intent
function generateResponse(intent: string, message: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lowerMessage = message.toLowerCase();
  
  switch (intent) {
    case 'greeting':
      return `👋 Hello! Welcome to ${COMPANY_INFO.name}! I'm your shopping assistant. How can I help you today? Whether you're looking for products, checking orders, or need recommendations - I'm here for you! 😊`;
    
    case 'pricing':
      return `💰 Great question about pricing! We offer competitive prices with regular discounts. Could you let me know which product you're interested in? I'll check the current price and any ongoing offers for you! 🏷️`;
    
    case 'order_status':
      return `📦 I can help you track your order! Please share your order ID or tracking number, and I'll check the current status for you. You can also check your order history in your account section. 🔍`;
    
    case 'product_info':
      return `🛍️ I'd love to help you find the perfect product! Could you tell me what you're looking for? You can browse by category or let me know your specific requirements. 🔎`;
    
    case 'budget_query':
      return `💸 Smart shopping! Let me find the best products within your budget. I'll search our catalog and suggest great options that fit your price range. 🎯`;
    
    case 'category_info':
      return `📚 We have amazing categories for you! Our main categories include Electronics, Fashion, Home & Living, Books, and Beauty products. Which category interests you most? 🌟`;
    
    case 'contact_info':
      return `📞 Here's how you can reach us:\n\nEmail: ${COMPANY_INFO.contact.email}\nPhone: ${COMPANY_INFO.contact.phones.join(', ')}\nAddress: ${COMPANY_INFO.contact.address}\n\nWe're here to help! 💫`;
    
    case 'return_policy':
      return `🔄 We have a customer-friendly return policy! Most items can be returned within 30 days. For specific details about returns, exchanges, or refunds, please contact our support team at ${COMPANY_INFO.contact.email}. 📝`;
    
    case 'gratitude':
      return `🙏 You're most welcome! It's my pleasure to assist you. If you have any more questions or need help with anything else, just let me know! Happy shopping! 🛒`;
    
    default:
      return `🤖 Thank you for your message! At ${COMPANY_INFO.name}, we're dedicated to providing you with the best shopping experience. How can I assist you today? 🎯`;
  }
}

// Get products within budget
async function getProductsWithinBudget(amount: number, currency: string = 'BDT'): Promise<IProduct[]> {
  try {
    // Convert to BDT if other currency
    let budgetInBDT = amount;
    if (currency === 'USD') {
      budgetInBDT = amount * 110; // Approximate conversion rate
    }
    
    // Find products where current price is within budget
    const products = await Product.find({
      'generalPrice.currentPrice': { $lte: budgetInBDT },
      isDeleted: false
    })
    .populate('category', 'name')
    .populate('subCategory', 'name')
    .sort({ 'generalPrice.currentPrice': -1 })
    .limit(10);
    
    return products;
  } catch (error) {
    console.error('Error fetching budget products:', error);
    return [];
  }
}

// Extract budget amount from message
function extractBudget(message: string): { amount: number; currency: string } {
  const tkMatch = message.match(/(\d+)\s*(tk|taka|৳)/i);
  const dollarMatch = message.match(/(\$|dollar)\s*(\d+)/i) || message.match(/(\d+)\s*(\$|dollar)/i);
  
  if (tkMatch) {
    return { amount: parseInt(tkMatch[1]), currency: 'BDT' };
  }
  
  if (dollarMatch) {
    const amount = dollarMatch[2] ? parseInt(dollarMatch[2]) : parseInt(dollarMatch[1]);
    return { amount, currency: 'USD' };
  }
  
  // Default: look for any number
  const numberMatch = message.match(/\d+/);
  if (numberMatch) {
    return { amount: parseInt(numberMatch[0]), currency: 'BDT' };
  }
  
  return { amount: 0, currency: 'BDT' };
}

// Update the getProductDetails function
async function getProductDetails(productName: string): Promise<IPopulatedProduct | null> {
  try {
    const product = await Product.findOne({
      name: { $regex: productName, $options: 'i' },
      isDeleted: false
    })
    .populate<{ category: { _id: Schema.Types.ObjectId; name: string } }>('category', 'name')
    .populate<{ subCategory: { _id: Schema.Types.ObjectId; name: string } }>('subCategory', 'name')
    .populate('reviews');
    
    return product as unknown as IPopulatedProduct;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

// Get categories with products
async function getCategoriesWithProducts(): Promise<any[]> {
  try {
    const categories = await Category.find({ isDeleted: false });
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find({
          category: category._id,
          isDeleted: false
        }).limit(5);
        return {
          category: category.name,
          products: products.map(p => p.name)
        };
      })
    );
    return categoriesWithProducts;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Main chatbot function
async function Chatbot(userMessage: string) {
  try {
    // Classify user intent
    const intent = classifyIntent(userMessage);
    
    // Handle specific intents with database queries
    let specificResponse = '';
    
    if (intent === 'budget_query') {
      const budget = extractBudget(userMessage);
      if (budget.amount > 0) {
        const products = await getProductsWithinBudget(budget.amount, budget.currency);
        if (products.length > 0) {
          specificResponse = `🎉 With ${budget.amount} ${budget.currency}, you can buy these amazing products:\n\n`;
          products.forEach((product, index) => {
            const price = product.generalPrice.currentPrice;
            const discount = product.generalPrice.discountPercentage > 0 ? 
              ` (${product.generalPrice.discountPercentage}% OFF 🏷️)` : '';
            specificResponse += `${index + 1}. ${product.name} - ৳${price}${discount}\n`;
          });
          specificResponse += `\n💡 Pro tip: Check out the product details for specifications and reviews!`;
        } else {
          specificResponse = `🤔 I couldn't find products within ${budget.amount} ${budget.currency}. But we have great options starting from ৳500! Would you like me to show you our budget-friendly collection? 💫`;
        }
      }
    }
    
    if (intent === 'product_info') {
      // Extract potential product names
      const productKeywords = userMessage.split(' ').filter(word => 
        word.length > 3 && !/(what|where|how|much|price|buy)/i.test(word)
      );
      
      if (productKeywords.length > 0) {
        for (const keyword of productKeywords) {
          const product = await getProductDetails(keyword);
          if (product) {
            specificResponse = `🛍️ **${product.name}**\n\n`;
            specificResponse += `💰 Price: ৳${product.generalPrice.currentPrice}`;
            if (product.generalPrice.prevPrice > product.generalPrice.currentPrice) {
              specificResponse += ` (Was: ৳${product.generalPrice.prevPrice}, Save ${product.generalPrice.discountPercentage}%! 🎉)`;
            }
            specificResponse += `\n\n⭐ Rating: ${product.averageRating}/5 (${product.totalReviewCount} reviews)\n`;
            specificResponse += `📝 Description: ${product.details.substring(0, 150)}...\n`;
            specificResponse += `🏷️ Category: ${product.category?.name}\n`;
            
            if (product.quickOverview && product.quickOverview.length > 0) {
              specificResponse += `\n🔍 Quick Overview:\n`;
              product.quickOverview.slice(0, 3).forEach(point => {
                specificResponse += `• ${point}\n`;
              });
            }
            
            specificResponse += `\n💎 **Why choose this?** ${product.hasOffer ? '🔥 LIMITED TIME OFFER!' : 'Great value for money!'}`;
            break;
          }
        }
      }
    }
    
    if (intent === 'category_info') {
      const categories = await getCategoriesWithProducts();
      if (categories.length > 0) {
        specificResponse = `📚 **Our Product Categories**\n\n`;
        categories.forEach(cat => {
          specificResponse += `🏷️ **${cat.category}**: ${cat.products.join(', ')}\n\n`;
        });
        specificResponse += `🎯 Which category interests you? I can show you specific products!`;
      }
    }
    
    // Generate base response
    let response = specificResponse || generateResponse(intent, userMessage);
    
    // For complex or general queries, enhance with AI while maintaining e-commerce context
    if (intent === 'general' || userMessage.length > 30 || !specificResponse) {
      const enhancedPrompt = `
You are an AI shopping assistant for ${COMPANY_INFO.name} - a premium e-commerce store.

Store Context:
- Products: ${COMPANY_INFO.services.products.join(', ')}
- Categories: Electronics, Fashion, Home & Living, Books, Beauty
- Contact: ${COMPANY_INFO.contact.email}, ${COMPANY_INFO.contact.phones[0]}
- Location: ${COMPANY_INFO.contact.location}

User Question: "${userMessage}"

Current Response: "${response}"

Please provide a helpful, professional response in the same language as the user's question that:
1. Directly addresses the user's shopping needs
2. Highlights relevant products and categories
3. Maintains a friendly and helpful shopping assistant tone
4. Encourages exploration and purchases
5. Keeps response concise and actionable
6. Uses emojis appropriately for engagement

Response Guidelines:
- Be enthusiastic about helping with shopping
- Mention specific categories or products when relevant
- Include shopping tips or recommendations
- End with encouraging next steps

Enhanced Response in user's language:`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: enhancedPrompt,
        });
        
        if (aiResponse.text) {
          response = aiResponse.text;
        }
      } catch (aiError) {
        console.error('AI enhancement failed, using base response:', aiError);
        // Fall back to base response
      }
    }

    // Ensure response includes store branding for general queries
    if (!response.includes(COMPANY_INFO.name) && intent !== 'greeting' && !specificResponse) {
      response += `\n\n---\n*Happy Shopping at ${COMPANY_INFO.name}! 🛍️*`;
    }

    console.log(`User: ${userMessage}`);
    console.log(`Intent: ${intent}`);
    console.log(`Response: ${response}`);
    
    return response;

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback responses
    return `I apologize for the technical difficulty. As ${COMPANY_INFO.name}, we're here to help with your shopping needs:

🛍️ Product Recommendations & Shopping Assistance
📦 Order Tracking & Support
💸 Budget-Friendly Finds
🎯 Category Navigation

Please contact us directly at ${COMPANY_INFO.contact.email} or call ${COMPANY_INFO.contact.phones[0]} for immediate assistance.

We're committed to making your shopping experience amazing! ✨`;
  }
}

// Additional utility function for conversation history
export async function ChatbotWithHistory(userMessage: string, conversationHistory: Array<{role: string, content: string}>) {
  const context = conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n');
  
  const contextualPrompt = `
Conversation History:
${context}

Current User Message: "${userMessage}"

You are ${COMPANY_INFO.name} AI shopping assistant. Provide a helpful response focusing on:
- Product recommendations and shopping assistance
- Order tracking and support
- Budget-friendly shopping tips
- Category navigation and product discovery
- Customer service and support

Keep responses friendly, engaging, and focused on enhancing the shopping experience. Use emojis appropriately and maintain a helpful tone.

Response in the same language as user's message:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextualPrompt,
    });
    
    return response.text || `Thank you for your message! How can ${COMPANY_INFO.name} help with your shopping today? 🛍️`;
  } catch (error: any) {
    console.log('AI with history failed:', error);
    return Chatbot(userMessage);
  }
}

// Get order status
export async function getOrderStatus(orderId: string) {
  try {
    const order = await OrderModel.findOne({ 
      orderId: orderId.toUpperCase(),
      isDeleted: false 
    })
    .populate('products');
    
    if (!order) {
      return `❌ Order not found. Please check your Order ID and try again.`;
    }
    
    return `📦 **Order Status**: ${order.orderStatus.toUpperCase()}\n\n` +
           `🆔 Order ID: ${order.orderId}\n` +
           `💰 Total Amount: ৳${order.grandTotal}\n` +
           `🚚 Delivery Status: ${order.isDelivered ? 'Delivered ✅' : 'In Progress 🕒'}\n` +
           `💳 Payment Status: ${order.paymentStatus}\n` +
           `📮 Tracking: ${order.trackingId || 'Not available yet'}\n\n` +
           `Thank you for shopping with ${COMPANY_INFO.name}! ✨`;
  } catch (error) {
    console.error('Error fetching order status:', error);
    return `❌ Sorry, I couldn't retrieve your order status at the moment. Please try again later or contact support.`;
  }
}

export default Chatbot;