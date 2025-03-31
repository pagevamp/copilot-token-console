'use client';
import { useState } from 'react';
import { getElementDetailFromId } from '@/actions/token';
import { toast } from 'react-toastify';

export const useToken = () => {
  const [tokenBasedInfo, setTokenBasedInfo] = useState<
    Map<string, Record<string, any>>
  >(new Map());
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (key: string, id: string) => {
    // TODO: compose key (key + id)
    if (!tokenBasedInfo.has(key)) {
      try {
        setIsLoading(true);
        const jsonVal = await getElementDetailFromId({ id, idKey: key });
        setIsLoading(false);
        const newCache = new Map(tokenBasedInfo);
        newCache.set(key, jsonVal);
        setTokenBasedInfo(newCache);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.message || 'Something went wrong');
      }
    }
  };
  return { handleClick, tokenBasedInfo, isLoading };
};
