import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase - Usando anon key en lugar de service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company } = body

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Insertar en la tabla leads - solo las columnas que existen
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          company: company || null
          // created_at se genera automáticamente por Supabase
        }
      ])
      .select()

    if (error) {
      console.error('Error al insertar en Supabase:', error)
      return NextResponse.json(
        { error: 'Error al guardar los datos: ' + error.message },
        { status: 500 }
      )
    }

    console.log('Lead guardado exitosamente:', data)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead guardado exitosamente',
        data 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener leads:', error)
      return NextResponse.json(
        { error: 'Error al obtener los datos' },
        { status: 500 }
      )
    }

    return NextResponse.json({ leads: data })

  } catch (error) {
    console.error('Error en la API GET:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
