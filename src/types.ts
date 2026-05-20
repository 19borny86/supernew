export type ActiveTab = 'heritage' | 'catalog' | 'materials' | 'contact';

export interface Product {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  specifications?: string[];
}

export interface InquiryFormData {
  fullName: string;
  company: string;
  workEmail: string;
  areaOfInterest: string;
  message: string;
}
