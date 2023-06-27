#An alternative to the built-in PromptForChoice providing a consistent UI across different hosts
function Get-Choice {
    [CmdletBinding()]
    Param
    (
        [Parameter(Mandatory=$true,Position=0)]
        $Title,

        [Parameter(Mandatory=$true,Position=1)]
        [String[]]
        $Options,

        [Parameter(Position=2)]
        $DefaultChoice = -1
    )
    if ($DefaultChoice -ne -1 -and ($DefaultChoice -gt $Options.Count -or $DefaultChoice -lt 1)){
        Write-Warning "DefaultChoice needs to be a value between 1 and $($Options.Count) or -1 (for none)"
        exit
    }
    Add-Type –AssemblyName System.Windows.Forms
    Add-Type –AssemblyName System.Drawing
    [System.Windows.Forms.Application]::EnableVisualStyles()
    $script:result = ""
    $form = New-Object System.Windows.Forms.Form
    $form.FormBorderStyle = [Windows.Forms.FormBorderStyle]::FixedDialog
    $form.BackColor = [Drawing.Color]::White
    $form.TopMost = $True
    $form.Text = $Title
    $form.ControlBox = $False
    $form.StartPosition = [Windows.Forms.FormStartPosition]::CenterScreen
    #calculate width required based on longest option text and form title
    $minFormWidth = 100
    $formHeight = 44
    $minButtonWidth = 70
    $buttonHeight = 23
    $buttonY = 12
    $spacing = 10
    $buttonWidth = [Windows.Forms.TextRenderer]::MeasureText((($Options | sort Length)[-1]),$form.Font).Width + 1
    $buttonWidth = [Math]::Max($minButtonWidth, $buttonWidth)
    $formWidth =  [Windows.Forms.TextRenderer]::MeasureText($Title,$form.Font).Width
    $spaceWidth = ($options.Count+1) * $spacing
    $formWidth = ($formWidth, $minFormWidth, ($buttonWidth * $Options.Count + $spaceWidth) | Measure-Object –Maximum).Maximum
    $form.ClientSize = New-Object System.Drawing.Size($formWidth,$formHeight)
    $index = 0
    #create the buttons dynamically based on the options
    foreach ($option in $Options){
        Set-Variable "button$index" –Value (New-Object System.Windows.Forms.Button)
        $temp = Get-Variable "button$index" –ValueOnly
        $temp.Size = New-Object System.Drawing.Size($buttonWidth,$buttonHeight)
        $temp.UseVisualStyleBackColor = $True
        $temp.Text = $option
        $buttonX = ($index + 1) * $spacing + $index * $buttonWidth
        $temp.Add_Click({ 
            $script:result = $this.Text; $form.Close() 
        })
        $temp.Location = New-Object System.Drawing.Point($buttonX,$buttonY)
        $form.Controls.Add($temp)
        $index++
    }
    $shownString = '$this.Activate();'
    if ($DefaultChoice -ne -1){
        $shownString += '(Get-Variable "button$($DefaultChoice-1)" -ValueOnly).Focus()'
    }
    $shownSB = [ScriptBlock]::Create($shownString)
    $form.Add_Shown($shownSB)
    [void]$form.ShowDialog()
    $result
}


[System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic') | Out-Null
$title= [Microsoft.VisualBasic.Interaction]::InputBox("Please declare the title of your page" , "Edenfell Page JSON formatter","<Title>")

$content=[System.Collections.ArrayList]::new();
$option1 =  'Add New Item'
$option2 =  'Save And Quit'

$subOption1 =  'Column'
$subOption2 =  'Inline'
$subOption3 =  'List'

$imgOption1 =  'Add Image'
$imgOption2 =  'Skip'

$imgPos1 = 'Left'
$imgPos2 = 'Center'
$imgPos3 = 'Right'

$options = @($option1, $option2)

$result=Get-Choice -Title 'Please select one of the options below:' -Options $options -DefaultChoice -1

$i=1;

while ($result -ne 'Save And Quit'){
    
    $itemTitle = [Microsoft.VisualBasic.Interaction]::InputBox("Please declare the title of your item" , "Edenfell Page JSON formatter","<Item Title>")
    $divID = $i  

    <#    
    $typeResult = Get-Choice -Title 'Please select one of the options below:'-Options @($subOption1,$subOption2,$subOption3) -DefaultChoice -1

    $type = switch ($typeResult) 
    {
        0 {'column'}
        1 {'inline'}
        2 {'list'}
    }
    #>
    $type = $(Get-Choice -Title 'Please select one of the options below:'-Options @($subOption1,$subOption2,$subOption3) -DefaultChoice -1).ToLower()

    if ($type -eq 'list'){$paragraphs=@($(@{text='<txt>';type='li'} | ConvertTo-Json| %{[regex]::Unescape($_)}))}else{$paragraphs=@()}

    $imgResult = Get-Choice -Title 'Please select one of the options below:' -Options @($imgOption1,$imgOption2) -DefaultChoice -1

    if ($imgResult -eq $imgOption1) {
        $img = [Microsoft.VisualBasic.Interaction]::InputBox("Please input the filename of your desired image" , "Edenfell Page JSON formatter","<Image Filename>")
        $imgTypeResult =  Get-Choice -Title 'Please select one of the options below:' -Options @($imgPos1,$imgPos2,$imgPos3) -DefaultChoice -1
        $imgType =  switch ($imgTypeResult) 
        {
            'Left' {'left'}
            'Center' {'mid'}
            'Right' {'right'}
        }
    }

    $content.Add([ordered]@{
        divID=$divID;
        title=$itemTitle;
        paragraphs=$paragraphs;
        type=$type;
        img=$img;
        imgType=$imgType
        }
    )

    $result=Get-Choice -Title 'Please select one of the options below:' -Options $options -DefaultChoice -1
    $i++
    if($paragraphs){Remove-Variable paragraphs}
    if($type)      {Remove-Variable type}
    if($img)       {Remove-Variable img}
    if($imgType)   {Remove-Variable imgType}
}


#world/characters/server

$treeOption1 = 'World'
$treeOption2 = 'Characters'
$treeOption3 = 'Server'

$treeResult = Get-Choice -Title 'Please select one of the main trees below:' -Options @($treeOption1,$treeOption2,$treeOption3) -DefaultChoice -1

$tree = $treeResult.ToLower()


$jsonArr = [ordered]@{page=$title;url="/$tree/$($title.ToLower())"} | ConvertTo-Json | %{[regex]::Unescape($_)}
$jsonArr = $jsonArr.Substring(0,$jsonArr.Length-1)
$jsonArr = $jsonArr + ",
    `"content`": $($content|ConvertTo-Json | %{[regex]::Unescape($_)})
}";

$jsonArr=$jsonArr.Replace('"{','{').Replace('}"','}')
 
$jsonArr | Out-File -FilePath "$PSScriptRoot\$title.json"