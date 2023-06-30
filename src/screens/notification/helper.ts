export const formatNotyResponse = (data: any[]) => {
  return data.map((item) => {
    return {
      id: item.id,
      message: item.eventDesc,
      Date: item.createdOn,
      type: item.eventType,
      highlightedText: ["mukthahar shaik"],
      isRead: item.isActive,
    };
  });

  return data;
};
