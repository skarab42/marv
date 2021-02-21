module.exports = {
  events: [
    { name: "onShortcut", tags: {} },
    {
      name: "onAction",
      tags: { user: "user", message: "message", date: "date" },
    },
    { name: "onBan", tags: { user: "user" } },
    {
      name: "onBits",
      tags: {
        user: "user",
        message: "message",
        amount: "amount",
        total: "total",
      },
    },
    {
      name: "onBitsBadgeUpgrade",
      tags: { user: "user", threshold: "threshold" },
    },
    { name: "onCommand", tags: {} },
    {
      name: "onCommunityPayForward",
      tags: { fromUser: "fromUser", toUser: "toUser" },
    },
    {
      name: "onCommunitySub",
      tags: {
        user: "user",
        count: "count",
        total: "total",
        tiers: "tiers",
      },
    },
    { name: "onFollow", tags: { user: "user" } },
    {
      name: "onGiftPaidUpgrade",
      tags: { fromUser: "fromUser", toUser: "toUser", tiers: "tiers" },
    },
    {
      name: "onHosted",
      tags: { channel: "channel", viewerCount: "viewerCount" },
    },
    { name: "onJoin", tags: { user: "user" } },
    { name: "onMessage", tags: { user: "user", message: "message" } },
    { name: "onPart", tags: { user: "user" } },
    {
      name: "onPrimeCommunityGift",
      tags: { user: "user", name: "name" },
    },
    {
      name: "onPrimePaidUpgrade",
      tags: { user: "user", tiers: "tiers" },
    },
    {
      name: "onRaid",
      tags: { channel: "channel", viewerCount: "viewerCount" },
    },
    {
      name: "onRedemption",
      tags: {
        id: "id",
        user: "user",
        reward: "reward",
        message: "message",
      },
    },
    {
      name: "onResub",
      tags: {
        user: "user",
        plan: "plan",
        streak: "streak",
        isPrime: "isPrime",
        months: "months",
        message: "message",
        tiers: "tiers",
      },
    },
    {
      name: "onRewardGift",
      tags: {
        count: "count",
        domain: "domain",
        type: "type",
        user: "user",
        total: "total",
      },
    },
    {
      name: "onRitual",
      tags: { ritualName: "ritualName", message: "message" },
    },
    {
      name: "onStandardPayForward",
      tags: { user: "user", fromUser: "fromUser", toUser: "toUser" },
    },
    {
      name: "onSub",
      tags: {
        user: "user",
        plan: "plan",
        streak: "streak",
        isPrime: "isPrime",
        months: "months",
        message: "message",
        tiers: "tiers",
      },
    },
    {
      name: "onSubExtend",
      tags: {
        user: "user",
        months: "months",
        endMonth: "endMonth",
        tiers: "tiers",
      },
    },
    {
      name: "onSubGift",
      tags: {
        toUser: "toUser",
        fromUser: "fromUser",
        total: "total",
        duration: "duration",
        isPrime: "isPrime",
        message: "message",
        months: "months",
        plan: "plan",
        planName: "planName",
        streak: "streak",
      },
    },
  ],
};
