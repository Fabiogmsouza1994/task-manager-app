interface DashboardInterface {
id?: number;
title: string;
description: string;
category: string;
priority: string;
dueDate: string;
status: string;
createdAt?: Date | string;
completedAt?: Date;
}