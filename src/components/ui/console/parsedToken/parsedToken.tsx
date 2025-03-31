'use client';
import { Token } from '@/types/token.dto';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/shared/popover';
import { parsedTokenKeys } from '@/constant/token';
import { useToken } from '@/hook/useToken.hook';
import InputWithCopy from '@/components/ui/global/inputWithCopy';
import { Loader } from '../../global/loader';
import { NoData } from '../../global/noData';
import CardWithCopy from '../../global/cardWithCopy';
import { camelCaseToWords } from '@/utils/string';
import { useTokenContext } from '@/context/token.context';
import { useEffect } from 'react';

const ParsedTokenDisplay = ({
  token,
  tokenPayload,
}: {
  token: string;
  tokenPayload: Token;
}) => {
  const { handleClick, tokenBasedInfo, isLoading } = useToken();
  const { setParsedToken } = useTokenContext();

  useEffect(() => {
    setParsedToken(tokenPayload);

    localStorage.setItem('token', token);
    return () => {
      localStorage.removeItem('token');
    };
  }, [token, setParsedToken, tokenPayload]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-2xl font-bold mb-4">Parsed Token</div>
      {parsedTokenKeys.map((key: string, index: number) => {
        return (
          <div className="grid grid-cols-8 gap-4" key={index}>
            <div className="md:col-span-2 col-span-3">
              {camelCaseToWords(key)}
            </div>
            <div className="text-sm md:col-span-5 col-span-4">
              <InputWithCopy
                type="text"
                defaultValue={tokenPayload?.[key as keyof Token] || 'undefined'}
                disabled
              />
            </div>
            {tokenPayload && tokenPayload?.[key as keyof Token] && (
              <div className="flex justify-center items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <span title="View json data">
                      <Eye
                        className="cursor-pointer"
                        onClick={
                          tokenPayload?.[key as keyof Token]
                            ? () =>
                                handleClick(
                                  key,
                                  tokenPayload?.[key as keyof Token] as string
                                )
                            : undefined
                        }
                      />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="md:w-2xl sm:w-xl sm:mx-0 w-full mx-2">
                    <div>
                      <div className="text-pretty break-words">
                        {isLoading ? (
                          <Loader />
                        ) : tokenBasedInfo.get(key) ? (
                          <CardWithCopy
                            text={JSON.stringify(
                              tokenBasedInfo.get(key),
                              null,
                              2
                            )}
                          />
                        ) : (
                          <NoData className="text-sm italic" />
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParsedTokenDisplay;
