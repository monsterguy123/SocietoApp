import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            adminId?: string;
            userId?: string;
        }
    }
}

export const CreateFees = async (req: Request, res: Response) => {
    try {
        const fees: { title: string, startDate: string, endDate: string } = req.body;
        const AdminId = req.adminId || "";

        // Create Fees
        const feeCreated = await prisma.fees.create({
            data: {
                title: fees.title,
                Society: req.society || "",
                startDate: fees.startDate,
                endDate: fees.endDate,
                AdminId,
            }
        });

        if (feeCreated) {
            res.json({ msg: "Fees Created Successfully..." });
        }

    } catch (error: any) {
        res.json({ msg: error.message });
    }
}

// Getting all donations
export const getDonations = async (req: Request, res: Response) => {
    try {
        const Donations = await prisma.fees.findMany({
            where: {
                Society: req.society
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                endDate: true,
            }
        });

        if (Donations) {
            return res.json({ Donations });
        }

    } catch (error: any) {
        return res.json({ msg: error.message });
    }
}

export const SubmitFees = async (req: Request, res: Response) => {
    try {
        const Donation: { dona: number } = req.body;
        const id = req.params.donationId;

        // Already Submitted
        const Already = await prisma.fees.findUnique({
            where: { id },
            select: {
                user_Submitter: {
                    where: { id: req.userId },
                    select: {
                        id: true
                    }
                }
            }
        });

        if (Already?.user_Submitter.length !== 0) {
            return res.json({ msg: "already donated no need to donate more One donation per flat..." });
        }

        // Submit Donations
        const Donate = await prisma.$transaction(async (prisma) => {
            return await prisma.fees.update({
                where: { id },
                data: {
                    Donations: {
                        increment: Donation.dona
                    },
                    user_Submitter: {
                        connect: {
                            id: req.userId
                        }
                    }
                },
                select: {
                    id: true
                }
            });
        });

        if (Donate) {
            return res.json({ msg: "Donated Successfully..." });
        }

    } catch (error: any) {
        return res.json({ msg: error.message });
    }
}
