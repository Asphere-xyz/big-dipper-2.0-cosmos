import chainConfig from '@/chainConfig';
import {
  AccountBalancesDocument,
  // AccountWithdrawalAddressDocument,
  AccountDelegationBalanceDocument,
} from '@/graphql/general/account_details_documents';
import axios from 'axios';

const { endpoints } = chainConfig();
const urlEndpoints = [
  process.env.NEXT_PUBLIC_GRAPHQL_URL,
  endpoints.graphql,
  'http://localhost:3000/v1/graphql',
];

export const fetchAvailableBalances = async (address: string) => {
  const defaultReturnValue = {
    accountBalances: {
      coins: [],
    },
  };
  try {
    const url = urlEndpoints.find((u) => u) ?? '';
    const { data } = await axios.post(url, {
      variables: {
        address,
      },
      query: AccountBalancesDocument,
    });
    return data?.data ?? defaultReturnValue;
  } catch (error) {
    return defaultReturnValue;
  }
};

// export const fetchAccountWithdrawalAddress = async (address: string) => {
//   const defaultReturnValue = {
//     withdrawalAddress: {
//       address,
//     },
//   };
//   try {
//     const { data } = await axios.post(getUrl(), {
//       variables: {
//         address,
//       },
//       query: AccountWithdrawalAddressDocument,
//     });
//     return data?.data ?? defaultReturnValue;
//   } catch (error) {
//     return defaultReturnValue;
//   }
// };

export const fetchDelegationBalance = async (address: string) => {
  const defaultReturnValue = {
    delegationBalance: {
      coins: [],
    },
  };
  try {
    const url = urlEndpoints.find((u) => u) ?? '';
    const { data } = await axios.post(url, {
      variables: {
        address,
      },
      query: AccountDelegationBalanceDocument,
    });
    return data?.data ?? defaultReturnValue;
  } catch (error) {
    return defaultReturnValue;
  }
};