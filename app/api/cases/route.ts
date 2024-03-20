import prisma from "@/prisma/client";

export async function fetchStatusCases() {
  const statusCases = await prisma.stage.findMany({
    include: {
      statuses: {
        include: {
          cases: true,
        },
      },
    },
  });

  return statusCases;
}
