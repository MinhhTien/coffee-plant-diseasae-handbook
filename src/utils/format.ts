export const formatSeason = (season: string) => {
  switch (season) {
    case "SPRING":
      return "Xuân";
    case "SUMMER":
      return "Hạ";
    case "FALL":
      return "Thu";
    case "WINTER":
      return "Đông";
    default:
      return season;
  }
};

export const formatLevel = (level: string) => {
  switch (level) {
    case "LOW":
      return "Nhẹ";
    case "MEDIUM":
      return "Trung bình";
    case "HIGH":
      return "Nghiêm trọng";
    default:
      return level;
  }
};


export const formatPreventionType = (type: string) => {
  switch (type) {
    case "CHEMISTRY":
      return "Hóa học";
    case "BIOLOGY":
      return "Sinh học";
    case "PHYSICS":
      return "Vật lý";
    default:
      return type;
  }
}