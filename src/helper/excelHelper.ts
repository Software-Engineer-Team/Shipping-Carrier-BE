import xlsx from "xlsx";
export function readExcelFile(filePath: string): any {
  const workbook = xlsx.readFile(filePath, { bookVBA: true });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const jsonData = xlsx.utils.sheet_to_json(sheet);
  const columnHeaders = jsonData[0];
  const results = [];

  for (let i = 1; i < jsonData.length; i++) {
    const rowData = jsonData[i] as any;

    const result = {};
    for (const key in rowData) {
      const columnHeader = columnHeaders[key];
      const cellData = rowData[key];
      result[columnHeader] = cellData;
    }

    results.push(result);
  }
  return results;
}

export const validateUploadFields = (data: any[], requiredFields: any[]) => {
  if (!data.length) {
    return {
      errors: "Dữ liệu trống.",
      isValid: false,
    };
  }
  const result = new Set();
  for (const excelData of data) {
    for (const field of requiredFields) {
      if (!excelData.hasOwnProperty(field)) {
        result.add(field);
      }
    }
  }
  if (result.size !== 0) {
    return {
      errors: `Thiếu trường thông tin: ${Array.from(result).join(", ")}`,
      isValid: false,
    };
  }

  return {
    errors: ``,
    isValid: true,
  };
};

export const validateFields = (body: any, requiredFields: any[]) => {
  const missingFields = requiredFields.filter(
    (field) => !body.hasOwnProperty(field),
  );

  if (missingFields.length) {
    return {
      errors: `Thiếu trường thông tin: ${Array.from(missingFields).join(", ")}`,
      isValid: false,
    };
  }

  return {
    errors: ``,
    isValid: true,
  };
};
