import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<any>> {
  try {
    await fetchStatus();
    await fetchCases();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

async function fetchStatus(): Promise<void> {
  const queryUrl = "https://oda.ft.dk/api/Sagsstatus";
  const data = await retrieveData(queryUrl);

  data.forEach(async (element: any) => {
    const upsertData = {
      status: element["status"],
      id: element["id"],
    };

    await prisma.status.upsert({
      where: {
        id: element["id"],
      },
      update: upsertData,
      create: upsertData,
    });
  });
}

async function fetchCases(): Promise<void> {
  const queryUrl =
    "https://oda.ft.dk/api/Sag?$filter=(typeid eq 3 or typeid eq 6 or typeid eq 9) and periodeid eq 160";
  const data = await retrieveData(queryUrl);

  data.forEach(async (element: any) => {
    const status = await prisma.status.findUnique({
      where: {
        id: element["statusid"],
      },
    });

    if (status) {
      const upsertData = {
        id: element["id"],
        titel: element["titel"],
        titel_short: element["titelkort"],
        typeid: element["typeid"],
        kategoriid: element["kategoriid"],
        number: element["nummer"],
        statusid: status.id,
      };

      await prisma.case.upsert({
        where: {
          id: element["id"],
        },
        update: upsertData,
        create: upsertData,
      });
    }
  });
}

async function retrieveData(queryUrl: string): Promise<any[]> {
  const results: any[] = [];

  async function handlePagination(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    results.push(...data.value);

    // Check if there is a NextLink
    if (data["odata.nextLink"]) {
      await handlePagination(data["odata.nextLink"]);
    }
  }

  await handlePagination(queryUrl);
  return results;
}
