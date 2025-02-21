"use client"

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
    return (
        <div className="w-full max-w-md text-center mx-auto mt-20">
            <div className="flex flex-col items-center space-y-4">
                <AlertTriangle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            </div>
            <div className="mt-6 space-y-6">
                <p className="text-muted-foreground">
                    Oops! The page you are looking for seems to have wandered off.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button asChild variant="outline">
                        <Link href="/">
                            Go to Home
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/contact">
                            Contact Support
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}