// --- interfaces
import { IStoreTag } from "@/src/hooks/useStoreQueryParams";

/** 
 * Utility that checks if object is valid StoreTag (tags are used in store filtering)
 */
const isStoreTag = (tag: any): tag is IStoreTag => {

  const storeTags: IStoreTag[] = ['medium', 'large', 'small', 'pet friendly', 'slow', 'fast', 'non-flowering', 'seasonal flowering'];
  return storeTags.includes(tag);
}

export default isStoreTag;