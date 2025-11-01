/**
 * Calculate estimated delivery date based on number of days
 * @param days - Number of days to add (default: 5)
 * @returns Formatted date string
 */
export function getEstimatedDeliveryDate(days: number = 5): string {
  const today = new Date();
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);
  
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  
  return deliveryDate.toLocaleDateString('en-US', options);
}

/**
 * Get a formatted date string for display
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  
  return dateObj.toLocaleDateString('en-US', options);
}

