export async function sendWhatsAppMessage(enquiry: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceDate: string;
  message: string;
}) {
  const whatsappNumber = "+918069377929";
  
  const message = `*New Enquiry from Shiva Sadhana Website*

*Service:* ${enquiry.serviceType.charAt(0).toUpperCase() + enquiry.serviceType.slice(1)}
*Name:* ${enquiry.name}
*Email:* ${enquiry.email}
*Phone:* ${enquiry.phone}
*Service Date:* ${enquiry.serviceDate}

*Message:*
${enquiry.message}

Please follow up with this customer.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new window
  window.open(whatsappUrl, '_blank');
  
  return true;
}
