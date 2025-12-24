/**
 * Format string as E.164 phone number.
 * Basic implementation: assumes Nigerian numbers starting with 0 or +234.
 */
export function formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    
    // If starts with 0 (e.g., 080...), replace 0 with 234
    if (cleaned.startsWith('0')) {
      cleaned = '234' + cleaned.substring(1);
    }
    
    // Ensure it has + prefix
    return '+' + cleaned;
  }
  
  /**
   * Format currency (Naira)
   */
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  }
  
  /**
   * Format date to readable string
   */
  export function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
