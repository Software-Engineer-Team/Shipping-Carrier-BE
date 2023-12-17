import { BANK_ROUTE } from "../helper/constants";

const data = [
  {
    name: "Nông nghiệp và Phát triển nông thôn (VBA)",
  },
  {
    name: "Ngoại thương Việt Nam (VCB)",
  },
  {
    name: "Đầu tư và phát triển (BIDV)",
  },
  {
    name: "Công Thương Việt Nam (VIETINBANK)",
  },
  {
    name: "Việt Nam Thinh Vượng (VPB)",
  },
  {
    name: "Quốc tế (VIB)",
  },
  {
    name: "Xuất nhập khẩu (EIB)",
  },
  {
    name: "Sài Gòn Hà Nội (SHB)",
  },
  {
    name: "Tiên Phong (TPB)",
  },
  {
    name: "Kỹ Thương (TCB)",
  },
  {
    name: "Hàng hải (MSB)",
  },
  {
    name: "Bưu điện Liên Việt (LPB)",
  },
  {
    name: "Đông Á (DAB)",
  },
  {
    name: "Bắc Á (NASB)",
  },
  {
    name: "Sài Gòn Công thương (SGB)",
  },
  {
    name: "Việt Nam Thương tín (VIETBANK)",
  },
  {
    name: "Bản Việt (VCCB)",
  },
  {
    name: "Kiên Long (KLB)",
  },
  {
    name: "Xăng dầu Petrolimex (PGB)",
  },
  {
    name: "Đại chúng Việt Nam (PVC)",
  },
  {
    name: "Á Châu (ACB)",
  },
  {
    name: "Nam Á (NAMABANK)",
  },
  {
    name: "Sài Gòn (SCB)",
  },
  {
    name: "Đông Nam Á (SEAB)",
  },
  {
    name: "Phương Đông (OCB)",
  },
  {
    name: "Việt Á (VAB)",
  },
  {
    name: "Quốc Dân (NCB)",
  },
  {
    name: "Liên doanh VID Public Bank (VID)",
  },
  {
    name: "Bảo Việt (BVB)",
  },
  {
    name: "Đại Dương (OJB)",
  },
  {
    name: "Phát triển nhà TP HCM (HDB)",
  },
  {
    name: "Dầu khí toàn cầu (GPB)",
  },
  {
    name: "Sacombank (STB)",
  },
  {
    name: "An Bình (ABBANK)",
  },
  {
    name: "TNHH MTV Hong Leong VN (HLB)",
  },
  {
    name: "MTV Shinhan Việt Nam (SHBVN)",
  },
  {
    name: "Liên Doanh Việt Nga (VRB)",
  },
  {
    name: "Xây dựng Việt Nam (CBB)",
  },
  {
    name: "United Overseas Bank Việt Nam (UOB)",
  },
  {
    name: "Woori Việt Nam (Woori)",
  },
  {
    name: "Indovina (IVB)",
  },
  {
    name: "Việt Nam Thinh Vượng CAKE BANK(VPB)",
  },
  {
    name: "Việt Nam Thinh Vượng UBANK(VPB)",
  },
  {
    name: "Quân đội (MB)",
  },
];

export async function initializeBanks(strapi: any) {
  for (let d of data) {
    const existingBank = await strapi.service(BANK_ROUTE).findOneBank(d.name);
    if (!existingBank) {
      const cId = await strapi.query(BANK_ROUTE).create({
        data: {
          name: d.name,
        },
      });
      console.log(`generating bank::: ${cId.name} ::: ID=${cId.id}`);
    }
  }
}
