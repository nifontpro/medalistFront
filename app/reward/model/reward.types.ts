import {IMedal} from "@/medal/model/medal.types";

export interface INomineeRequest {
	name: string
	description?: string
	score: number
	userId: string
	medalId: string
	companyId: string
}

export interface IReward {
	id: string
	name: string
	description?: string
	score: number
	dateNominee: number
	dateActive?: number
	dateInactive?: number
	state: RewardState
	userId: string
	sourceId: string
	companyId: string
	departmentId: string
	signatures: ISignature[]
	medal: IMedal
}

export type RewardState = "NOMINEE" | "ACTIVE" | "INACTIVE"

interface ISignature {
	mncId: string
	date: number
}

export const getRewardState = (state: RewardState): string => {
	switch (state) {
		case "NOMINEE":
			return "Номинант: ";
		case "ACTIVE":
			return "Награжден: ";
		case "INACTIVE":
			return "Лишен: ";
	}
}