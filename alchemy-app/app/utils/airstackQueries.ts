export function getFarcasterFollowings(address: string) {
  return `
query MyQuery {
  SocialFollowings(
    input: {
      filter: {
        dappName: { _eq: farcaster }
        identity: {
          _in: [
            "${address}"
          ]
        }
      }
      blockchain: ALL
      limit: 200
    }
  ) {
    Following {
      followingAddress {
        addresses
        socials(input: { filter: { dappName: { _eq: farcaster } } }) {
          profileName
          userId
          userAssociatedAddresses
        }
      }
      followingProfileId
      followerAddress {
        addresses
        domains {
          name
        }
        socials(input: { filter: { dappName: { _eq: farcaster } } }) {
          profileName
          userId
          userAssociatedAddresses
        }
      }
      followerProfileId
    }
  }
}
`;
}

export function getFarcasterFollowers(address: string) {
  return `
query MyQuery {
  SocialFollowers(
    input: {
      filter: {
        dappName: { _eq: farcaster }
        identity: {
          _in: [
            "${address}"
          ]
        }
      }
      blockchain: ALL
      limit: 200
    }
  ) {
    Follower {
      followerAddress {
        addresses
        socials(input: { filter: { dappName: { _eq: farcaster } } }) {
          profileName
          userId
          userAssociatedAddresses
        }
      }
      followerProfileId
      followerTokenId
      followingAddress {
        addresses
        domains {
          name
        }
        socials(input: { filter: { dappName: { _eq: farcaster } } }) {
          profileName
          userId
          userAssociatedAddresses
        }
      }
      followingProfileId
    }
  }
}`;
}
