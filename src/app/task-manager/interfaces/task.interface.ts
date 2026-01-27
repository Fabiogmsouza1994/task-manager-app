interface Task {
id: number;
title: string;
description: string;
category: string;
priority: string;
dueDate: Date;
status: string;
createdAt: Date;
completedAt?: Date;
}